import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 15000,
  reporter: "line",
  globalSetup: require.resolve("./src/tests/global-setup"),
  use: {
    baseURL: process.env.BASE_URL || "https://petstore.swagger.io/v2/",

    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
});
