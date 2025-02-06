import { cacheModel } from "./create-cache-middleware.js";
import { openAiModels } from "./models.js";
import { generateText } from "ai";
import { createStorage } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

const storage = createStorage({
  driver: redisDriver({
    base: "llm-cache",
  }),
});

const model = cacheModel(openAiModels.gpt4o, storage);

const result = await generateText({
  model,
  prompt: "Tell me a joke",
});

console.log(result);
