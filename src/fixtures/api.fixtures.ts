import { test as base } from "@playwright/test";
import { ApiClient } from "../utils/api.client";
import { PetApi } from "../api/pet.api";
import { StoreApi } from "../api/store.api";
import { UserApi } from "../api/user.api";
import { User } from "@src/models/user.model";
import { generateTestUser } from "./test.data";

export const test = base.extend<{
  petApi: PetApi;
  storeApi: StoreApi;
  userApi: UserApi;
  testUser: User;
}>({
  petApi: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    const petApi = new PetApi(apiClient);
    await use(petApi);
  },

  storeApi: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    const storeApi = new StoreApi(apiClient);
    await use(storeApi);
  },

  userApi: async ({ request }, use) => {
    const apiClient = new ApiClient(request);
    const userApi = new UserApi(apiClient);
    await use(userApi);
  },

  testUser: async ({}, use) => {
    const user = generateTestUser();
    await use(user);
  },
});

export { expect } from "@playwright/test";
