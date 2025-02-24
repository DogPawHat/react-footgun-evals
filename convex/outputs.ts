import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const createChatOutput = internalMutation({
  args: {
    inputId: v.id("chatInputs"),
    output: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chatOutputs", {
      inputId: args.inputId,
      output: args.output,
    });
  },
});
