import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">
        React Concept Evaluation
      </h1>
      <p className="mt-4 text-lg text-gray-500">
        Welcome to the React Concept Evaluation platform. This tool helps
        evaluate how well different LLMs explain React concepts to beginners.
      </p>
      <div className="mt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Dashboard
        </Link>
      </div>
    </div>
  );
}
