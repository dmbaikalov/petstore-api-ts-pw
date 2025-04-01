// playwright.config.ts
import { chromium, defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://petstore.swagger.io/v2",
    extraHTTPHeaders: {
      Accept: "application/json",
      // 'api_key': process.env.API_KEY || 'special-key'
    },

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "api",
    },
  ],
});
