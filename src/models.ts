import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

export const openAiModels = {
  gpt4o: openai("gpt-4o"),
  gpt4oMini: openai("gpt-4o-mini"),
};

export const anthropicModels = {
  claude35Sonnet: anthropic("claude-3-5-sonnet-latest"),
  claude35Haiku: anthropic("claude-3-5-haiku-latest"),
};
