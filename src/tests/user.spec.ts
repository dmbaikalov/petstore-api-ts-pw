import { expect } from "@playwright/test";
import { UserApi } from "../api/user.api";
import { testUser, createTestUser } from "../fixtures/test.data";
import { test } from "../fixtures/api.fixtures";

test.describe.parallel("User API Tests Suite", () => {
  let userApi: UserApi;
  const testUsername = testUser.username;

  test.afterAll(async ({ userApi }) => {
    for (const user of [testUser]) {
      try {
        await userApi.deleteUser(user.username);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  });

  test("Create and get a user", async ({ userApi, testUser }) => {
    const createResponse = await userApi.createUser(testUser);
    expect(createResponse.code).toBe(200);

    const user = await userApi.getUser(testUsername);
    expect(user.username).toBe(testUser.username);
    expect(user.email).toBe(testUser.email);
  });

  test("Update user information", async ({ userApi }) => {
    await userApi.createUser(testUser);

    const updateUser = createTestUser({
      firstName: "Updated",
      lastName: "Name",
      email: "updated@example.com",
    });

    const updateResposne = await userApi.updateUser(testUsername, updateUser);
    expect(updateResposne.code).toBe(200);

    const user = await userApi.getUser(testUsername);
    expect(user.firstName).toBe("Updated");
    expect(user.lastName).toBe("Name");
    expect(user.email).toBe("updated@example.com");
  });

  test("Delete a user", async ({ userApi }) => {
    await userApi.createUser(testUser);

    const deleteResponse = await userApi.deleteUser(testUsername);
    expect(deleteResponse.code).toBe(200);

    try {
      await userApi.getUser(testUsername);
      throw new Error(`User was not deleted`);
    } catch (error) {
      expect(error).toContain("404");
    }
  });

  test("User login and logout", async ({ userApi }) => {
    await userApi.createUser(testUser);

    const loginResponse = await userApi.login(
      testUser.username,
      testUser.password!,
    );
    expect(loginResponse.code).toBe(200);
    expect(loginResponse.message).toContain("logged in user session");

    const logoutResponse = await userApi.logout();
    expect(logoutResponse.code).toBe(200);
    expect(logoutResponse.message).toContain("ok");
  });
});
