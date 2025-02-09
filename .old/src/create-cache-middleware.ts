import type { Storage } from "unstorage";
import {
  type LanguageModelV1,
  type LanguageModelV1CallOptions,
  type LanguageModelV1Middleware,
  type LanguageModelV1StreamPart,
  simulateReadableStream,
} from "ai";
import { createHash } from "node:crypto";

const createKey = (params: LanguageModelV1CallOptions, modelId: string) => {
  return createHash("sha256")
    .update(JSON.stringify({ ...params, modelId }))
    .digest("hex");
};

export const createCacheMiddleware = (
  storage: Storage
): LanguageModelV1Middleware => ({
  wrapGenerate: async ({ model, doGenerate, params }) => {
    const cacheKey = createKey(params, model.modelId);

    const cached = (await storage.get(cacheKey)) as Awaited<
      ReturnType<LanguageModelV1["doGenerate"]>
    > | null;

    if (cached !== null) {
      return {
        ...cached,
        usage: {
          ...cached.usage,
          promptTokens: 0,
        },
        response: {
          ...cached.response,
          timestamp: cached?.response?.timestamp
            ? new Date(cached?.response?.timestamp)
            : undefined,
        },
      };
    }

    const result = await doGenerate();

    storage.set(cacheKey, result, {
      ttl: 60 * 60 * 24 * 7, // 1 week
    });

    return result;
  },
  wrapStream: async ({ doStream, params, model }) => {
    const cacheKey = createKey(params, model.modelId);

    // Check if the result is in the cache
    const cached = await storage.get(cacheKey);

    // If cached, return a simulated ReadableStream that yields the cached result
    if (cached !== null) {
      // Format the timestamps in the cached response
      const formattedChunks = (cached as LanguageModelV1StreamPart[]).map(
        (p) => {
          if (p.type === "response-metadata" && p.timestamp) {
            return { ...p, timestamp: new Date(p.timestamp) };
          } else if (p.type === "finish") {
            return {
              ...p,
              usage: { ...p.usage, promptTokens: 0, completionTokens: 0 },
            };
          } else return p;
        }
      );
      return {
        stream: simulateReadableStream({
          initialDelayInMs: 0,
          chunkDelayInMs: 10,
          chunks: formattedChunks,
        }),
        rawCall: { rawPrompt: null, rawSettings: {} },
      };
    }

    // If not cached, proceed with streaming
    const { stream, ...rest } = await doStream();

    const fullResponse: LanguageModelV1StreamPart[] = [];

    const transformStream = new TransformStream<
      LanguageModelV1StreamPart,
      LanguageModelV1StreamPart
    >({
      transform(chunk, controller) {
        fullResponse.push(chunk);
        controller.enqueue(chunk);
      },
      flush() {
        // Store the full response in the cache after streaming is complete
        storage.set(cacheKey, fullResponse);
      },
    });

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    };
  },
});
