import { streamText, wrapLanguageModel } from "ai";
import { evalite, createScorer } from "evalite";
import { traceAISDKModel } from "evalite/ai-sdk";
import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";
import { createCacheMiddleware } from "../create-cache-middleware.js";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

const openAiModelIds = ["gpt-4o", "gpt-4o-mini"];
const anthropicModelIds = [
  "claude-3-5-sonnet-latest",
  "claude-3-5-haiku-latest",
];
const storage = createStorage({
  driver: redisDriver({
    base: "react-footgun-evals",
  }),
});

const doesNotContainCreateReactApp = createScorer<string>({
  name: "Does not contain Create React App",
  description: "Checks that the output does not contain 'Create React App'",
  scorer: ({ output }) => {
    if (!output.includes("Create React App")) {
      return 1;
    }
    return 0;
  },
});

for (const modelId of openAiModelIds) {
  evalite(`${modelId} - Does not recommend create-react-app`, {
    data: async () => [
      {
        input: `Tell me how to create a react app`,
      },
    ],
    task: async (input) => {
      const result = streamText({
        model: traceAISDKModel(
          wrapLanguageModel({
            model: openai(modelId),
            middleware: createCacheMiddleware(storage),
          })
        ),
        prompt: input,
      });

      return result.textStream;
    },
    scorers: [doesNotContainCreateReactApp],
  });
}

for (const modelId of anthropicModelIds) {
  evalite(`${modelId} - Does not recommend create-react-app`, {
    data: async () => [
      {
        input: `Tell me how to create a react app`,
      },
    ],
    task: async (input) => {
      const result = streamText({
        model: traceAISDKModel(
          wrapLanguageModel({
            model: anthropic(modelId),
            middleware: createCacheMiddleware(storage),
          })
        ),
        prompt: input,
      });

      return result.textStream;
    },
    scorers: [doesNotContainCreateReactApp],
  });
}
