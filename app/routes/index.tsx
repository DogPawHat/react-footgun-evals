import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col items-center justify-center py-10 container">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
        Will ChatGPT tell you how to make a React component from scratch?
      </h1>
    </div>
  );
}
