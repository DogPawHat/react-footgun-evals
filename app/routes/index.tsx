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
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          React Prompt Evaluation
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Evaluating programming prompts for accuracy to help identify outdated
          or incorrect information.
        </p>
        <div className="mt-6 w-full max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to React Footgun Evals</CardTitle>
              <CardDescription>
                Discover which programming prompts contain outdated or incorrect
                information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                This platform displays evaluation scores, grades, and commentary
                on programming prompts to help users identify outdated or
                incorrect information.
              </p>
              <p className="text-muted-foreground">
                Browse through our evaluated prompts to learn what information
                is current and what might lead you astray.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="default">View Prompts</Button>
              <Button variant="outline">Learn More</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
