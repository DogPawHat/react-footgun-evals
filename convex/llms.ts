import { action } from "./_generated/server";
import { v } from "convex/values";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

// Define the shared argument type for eval requests
const evalArgsValidator = {
  prompt: v.string(),
  temperature: v.optional(v.number()),
  maxTokens: v.optional(v.number()),
};

export const evaluateWithGPT4 = action({
  args: evalArgsValidator,
  handler: async (ctx, args) => {
    const startTime = Date.now();

    try {
      const response = await streamText({
        model: openai("gpt-4o"),
        messages: [{ role: "user", content: args.prompt }],
        temperature: args.temperature ?? 0.7,
        maxTokens: args.maxTokens ?? 2048,
      });

      const duration = Date.now() - startTime;

      return new Response(response.text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Duration": duration.toString(),
        },
      });
    } catch (error) {
      throw new Error(`GPT-4 evaluation failed: ${error}`);
    }
  },
});

export const evaluateWithClaude = action({
  args: evalArgsValidator,
  handler: async (ctx, args) => {
    const startTime = Date.now();

    try {
      const response = await streamText({
        model: anthropic("claude-3-5-sonnet-latest"),
        messages: [{ role: "user", content: args.prompt }],
        temperature: args.temperature ?? 0.7,
        maxTokens: args.maxTokens ?? 2048,
      });

      const duration = Date.now() - startTime;

      return new Response(response.text, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Duration": duration.toString(),
        },
      });
    } catch (error) {
      throw new Error(`Claude evaluation failed: ${error}`);
    }
  },
});
