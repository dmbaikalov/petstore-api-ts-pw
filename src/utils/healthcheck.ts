import { APIRequestContext } from "@playwright/test";

export async function verifyApiHealth(
  request: APIRequestContext,
): Promise<boolean> {
  const response = await request.get("swagger.json");
  return response.status() === 200;
}
