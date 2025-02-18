import { defineSchema, defineTable } from "convex/server";
import { type Infer, v } from "convex/values";

const schema = defineSchema({
  runs: defineTable({
    runType: v.string(), // full, partial
  }).index("by_runType", ["runType"]), // Added an index for runType

  evals: defineTable({
    run_id: v.id("runs"),
    name: v.string(),
    filepath: v.string(),
    duration: v.number(),
  }).index("by_run_id", ["run_id"]), // Added an index for run_id

  results: defineTable({
    eval_id: v.id("evals"),
    duration: v.number(),
    input: v.string(), // JSON
    output: v.string(), // JSON
    expected: v.optional(v.string()), // JSON
    col_order: v.number(),
  }).index("by_eval_id", ["eval_id"]), // Added an index for eval_id

  scores: defineTable({
    result_id: v.id("results"),
    name: v.string(),
    score: v.number(),
    description: v.optional(v.string()),
    metadata: v.optional(v.string()), // JSON
  }).index("by_result_id", ["result_id"]), // Added an index for result_id

  traces: defineTable({
    result_id: v.id("results"),
    input: v.string(), // JSON
    output: v.string(), // JSON
    start_time: v.number(),
    end_time: v.number(),
    prompt_tokens: v.optional(v.number()),
    completion_tokens: v.optional(v.number()),
    col_order: v.number(),
  }).index("by_result_id", ["result_id"]), // Added an index for result_id
});
export default schema;
