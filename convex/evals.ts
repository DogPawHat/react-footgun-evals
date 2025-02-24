import { type WorkflowId, WorkflowManager } from "@convex-dev/workflow";
import { api, components, internal } from "./_generated/api";
import { v } from "convex/values";

import { workflow } from "./index";
import { internalAction, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// want to generate a prompt, then evaluate it
// then store the prompt, evaluation, and any other data in the database
// then return the results
export const generatePromptAndEvaluate = workflow.define({
  args: {
    chatInputId: v.id("chatInputs"),
  },
  handler: async (step, args) => {
    const result = await step.runQuery(api.inputs.getChatInput, {
      id: args.chatInputId,
    });

    const input = result!.input;

    // first, generate a prompt
    const prompt = await step.runAction(internal.llms.promptModel, {
      prompt: input,
      model: "gpt-4o",
    });

    // store the output
    const outputId = await step.runMutation(internal.outputs.createChatOutput, {
      inputId: args.chatInputId,
      output: prompt,
    });

    // then, evaluate the prompt
    await step.runMutation(internal.llms.evaluatePrompt, {
      output_id: outputId,
      scorer: "cra-grep",
    });
  },
});

export const processChatInputWorkflow = internalAction({
  args: {
    workflowId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      while (true) {
        const status = await workflow.status(
          ctx,
          args.workflowId as WorkflowId
        );
        if (status.type === "inProgress") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          continue;
        }
        console.log("Workflow completed with status:", status);
        break;
      }
    } finally {
      await workflow.cleanup(ctx, args.workflowId as WorkflowId);
    }
  },
});

export const createAndStartRun = internalMutation({
  handler: async (ctx) => {
    const runId = await ctx.db.insert("runs", {
      runType: "cron",
    });

    const evalId = await ctx.db.insert("evals", {
      runId,
      name: "Does not recommend Create React App",
    });

    const chatInputId = await ctx.db.insert("chatInputs", {
      evalId,
      modelId: "gpt-4o",
      input: "Tell me how to create a react app",
    });

    const workflowId = await workflow.start(
      ctx,
      internal.evals.generatePromptAndEvaluate,
      {
        chatInputId: chatInputId,
      }
    );

    await ctx.db.patch(chatInputId, {
      workflowId,
    });

    await ctx.scheduler.runAfter(0, internal.evals.processChatInputWorkflow, {
      workflowId,
    });
  },
});
