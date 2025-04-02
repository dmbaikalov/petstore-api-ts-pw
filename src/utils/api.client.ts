import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async get(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): Promise<APIResponse> {
    const response = await this.request.get(endpoint, { params });
    await this.verifyResponse(response);
    return response;
  }

  async post(endpoint: string, data?: any): Promise<APIResponse> {
    const response = await this.request.post(endpoint, { data });
    await this.verifyResponse(response);
    return response;
  }

  async put(endpoint: string, data?: any): Promise<APIResponse> {
    const response = await this.request.put(endpoint, { data });
    await this.verifyResponse(response);
    return response;
  }

  async delete(endpoint: string): Promise<APIResponse> {
    const response = await this.request.delete(endpoint);
    await this.verifyResponse(response);
    return response;
  }

  private async verifyResponse(response: APIResponse): Promise<void> {
    if (!response.ok()) {
      const body = await response.text();
      throw new Error(
        `API request failed with status ${response.status()}. \nResponse: ${body}`,
      );
    }
  }
}
