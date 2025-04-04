import { APIRequestContext, request } from "@playwright/test";
import { verifyApiHealth } from "../utils/healthcheck";

export default async function globalSetup() {
  const apiRequest = await request.newContext({
    baseURL: process.env.BASE_URL || "https://petstore.swagger.io/v2",
  });

  const isHealthy = await verifyApiHealth(apiRequest);

  if (!isHealthy) {
    console.error("API is not healthy - aborting test run");
    process.exit(1); 
  }

  await apiRequest.dispose();
}
