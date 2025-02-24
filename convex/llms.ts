import { internalAction, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { openai } from "@ai-sdk/openai";
// import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const acceptedModels = [v.literal("gpt-4o")] as const;

const acceptedScorers = [v.literal("cra-grep")] as const;

const craGrepScorer = async (output: string) => {
  if (!output.includes("Create React App")) {
    return 1000;
  }
  return 0;
};

const scorers = {
  "cra-grep": craGrepScorer,
} as const;

export const promptModel = internalAction({
  args: {
    prompt: v.string(),
    model: v.union(...acceptedModels),
  },
  handler: async (ctx, args) => {
    try {
      const response = await generateText({
        model: openai("gpt-4o"),
        messages: [{ role: "user", content: args.prompt }],
      });

      return response.text;
    } catch (error) {
      throw new Error(`GPT-4 evaluation failed: ${error}`);
    }
  },
});

export const evaluatePrompt = internalMutation({
  args: {
    output_id: v.id("chatOutputs"),
    scorer: v.union(...acceptedScorers),
  },
  handler: async (ctx, args) => {
    const output = await ctx.db.get(args.output_id);

    if (!output) {
      throw new Error("Output not found");
    }

    const score = await scorers[args.scorer](output.output);
    return await ctx.db.insert("scores", {
      outputId: args.output_id,
      name: args.scorer,
      scoredBy: args.scorer,
      score: BigInt(score),
    });
  },
});
