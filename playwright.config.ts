import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: /.*\.(spec|test)\.(ts|tsx)$/,
  fullyParallel: true,
  use: {
    trace: "on-first-retry",
  },
});
