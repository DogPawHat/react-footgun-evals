import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>;
}
