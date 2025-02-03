import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { evalite, createScorer } from "evalite";
import { describe } from "vitest";
import { traceAISDKModel } from "evalite/ai-sdk";
import { openAiModels, anthropicModels } from "../models.js";

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

for (const model of Object.values(openAiModels)) {
  evalite(`${model.modelId} - Does not recommend create-react-app`, {
    data: async () => [
      {
        input: `Tell me how to create a react app`,
      },
    ],
    task: async (input) => {
      const result = await streamText({
        model: traceAISDKModel(model),
        prompt: input,
      });

      return result.textStream;
    },
    scorers: [doesNotContainCreateReactApp],
  });
}

for (const model of Object.values(anthropicModels)) {
  evalite(`${model.modelId} - Does not recommend create-react-app`, {
    data: async () => [
      {
        input: `Tell me how to create a react app`,
      },
    ],
    task: async (input) => {
      const result = await streamText({
        model: traceAISDKModel(model),
        prompt: input,
      });

      return result.textStream;
    },
    scorers: [doesNotContainCreateReactApp],
  });
}
