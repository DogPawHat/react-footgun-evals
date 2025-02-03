import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    ANTHROPIC_API_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
  },

  client: {
    // Add any client-side environment variables here if needed
  },

  // For client-side env variables, they need to be prefixed with this
  clientPrefix: "NEXT_PUBLIC_",

  // Validate all environment variables are present at startup
  runtimeEnv: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },

  // Add validation for build-time vs runtime environment variables
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
