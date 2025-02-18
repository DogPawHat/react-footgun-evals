import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import type { Doc } from "~/convex/_generated/dataModel";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const stats = useQuery(api.dashboard.getDashboardStats);
  const recentEvals = useQuery(api.dashboard.getRecentEvaluations, {});
  const llmComparison = useQuery(api.dashboard.getLLMComparison);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            LLM Evaluation Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Summary Cards */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">
              Total Evaluations
            </h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {stats?.totalEvals ?? 0}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">
              Average Score
            </h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {stats?.averageScore ? stats.averageScore.toFixed(2) : "N/A"}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900">Last Run</h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {stats?.latestRun
                ? new Date(stats.latestRun._creationTime).toLocaleDateString()
                : "Never"}
            </p>
          </div>
        </div>

        {/* Recent Evaluations */}
        <div className="mt-8">
          <div className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Evaluations
              </h2>
              <div className="mt-4">
                {recentEvals && recentEvals.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {recentEvals.map((eval_) => (
                      <div
                        key={eval_._id.toString()}
                        className="flex items-center justify-between py-4"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {eval_.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Duration: {eval_.duration}ms
                          </p>
                          {eval_.run && (
                            <p className="text-sm text-gray-500">
                              Type: {eval_.run.runType}
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(eval_._creationTime).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No evaluations found
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="mt-8">
          <div className="rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                LLM Performance Comparison
              </h2>
              <div className="mt-4">
                {llmComparison && llmComparison.length > 0 ? (
                  <div className="space-y-4">
                    {llmComparison.map((comparison) => (
                      <div
                        key={comparison.resultId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              Result {comparison.resultId}
                            </p>
                            <p className="text-sm font-medium text-gray-900">
                              {comparison.average.toFixed(2)}
                            </p>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  comparison.average * 10
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No comparison data available
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
