import { query } from "./_generated/server";
import { v } from "convex/values";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const runs = await ctx.db.query("runs").collect();
    const evals = await ctx.db.query("evals").collect();
    const scores = await ctx.db.query("scores").collect();

    const totalEvals = evals.length;
    const averageScore =
      scores.length > 0
        ? scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length
        : null;

    // Get the latest run
    const latestRun =
      runs.length > 0
        ? runs.reduce((latest, curr) => {
            const currId = curr._id.toString();
            const latestId = latest._id.toString();
            return currId > latestId ? curr : latest;
          })
        : null;

    return {
      totalEvals,
      averageScore,
      latestRun,
    };
  },
});

export const getRecentEvaluations = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;

    // Get recent evals with their associated run data
    const recentEvals = await ctx.db.query("evals").order("desc").take(limit);

    // Fetch associated run data
    const evalResults = await Promise.all(
      recentEvals.map(async (eval_) => {
        const run = await ctx.db.get(eval_.run_id);
        return {
          ...eval_,
          run,
        };
      })
    );

    return evalResults;
  },
});

export const getLLMComparison = query({
  args: {},
  handler: async (ctx) => {
    const scores = await ctx.db.query("scores").collect();
    const results = await ctx.db.query("results").collect();

    // Group scores by eval and calculate averages
    const scoresByResult = scores.reduce(
      (acc, score) => {
        const resultId = score.result_id.toString();
        if (!acc[resultId]) {
          acc[resultId] = [];
        }
        acc[resultId].push(score);
        return acc;
      },
      {} as Record<string, typeof scores>
    );

    // Calculate average scores for each result
    const averageScores = Object.entries(scoresByResult).map(
      ([resultId, scores]) => {
        const average =
          scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
        return {
          resultId,
          average,
        };
      }
    );

    return averageScores;
  },
});
