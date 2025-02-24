import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  runs: defineTable({
    runType: v.literal("cron"),
  }).index("by_run_type", ["runType"]), // Added an index for runType

  evals: defineTable({
    runId: v.id("runs"),
    name: v.string(),
  }).index("by_run_id", ["runId"]), // Added an index for run_id

  chatInputs: defineTable({
    evalId: v.id("evals"),
    modelId: v.literal("gpt-4o"),
    input: v.string(),
    workflowId: v.optional(v.string()),
  }).index("by_eval_id", ["evalId"]),

  chatOutputs: defineTable({
    inputId: v.id("chatInputs"),
    output: v.string(),
  }).index("by_input_id", ["inputId"]),

  scores: defineTable({
    outputId: v.id("chatOutputs"),
    name: v.string(),
    scoredBy: v.literal("cra-grep"),
    // score is a number between 0 and 1000
    score: v.int64(),
    description: v.optional(v.string()),
    metadata: v.optional(v.string()), // JSON
  }).index("by_output_id", ["outputId"]),
});
export default schema;
