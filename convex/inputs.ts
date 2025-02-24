import { query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const getChatInput = query({
  args: {
    id: v.id("chatInputs"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createChatInput = internalMutation({
  args: {
    evalId: v.id("evals"),
    input: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chatInputs", {
      evalId: args.evalId,
      modelId: "gpt-4o",
      input: args.input,
    });
  },
});
