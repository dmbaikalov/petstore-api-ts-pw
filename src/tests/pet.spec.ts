import { test, expect } from "@playwright/test";
import { ApiClient } from "@src/utils/api-client";
import { PetApi } from "@src/api/pet.api";
import { testPet } from "@src/fixtures/test.data";
import { Pet } from "@src/models/pet.model";
import { exec } from "child_process";

test.describe.parallel("Pet API Test Suite", () => {
  let petApi: PetApi;

  test("Add a new pet to the store", async ({ request }) => {
    petApi = new PetApi(new ApiClient(request));

    const response = await petApi.addPet(testPet);
    const body = (await response.json()) as Pet;

    expect(response.status()).toBe(200);
    expect(body.id).toBe(testPet.id);
    expect(body.name).toBe(testPet.name);
  });

  test("Get pet by ID", async ({ request }) => {
    petApi = new PetApi(new ApiClient(request));

    await petApi.addPet(testPet);

    const response = await petApi.getPetById(testPet.id!);
    const body = (await response.json()) as Pet;

    expect(response.status()).toBe(200);
    expect(body).toEqual(testPet);
  });

  test("Update an existing pet", async ({ request }) => {
    petApi = new PetApi(new ApiClient(request));

    await petApi.addPet(testPet);

    const updatePet: Pet = {
      ...testPet,
      name: "Luna Updated",
      status: "sold",
    };

    const response = await petApi.updatePet(updatePet);
    const body = (await response.json()) as Pet;

    expect(response.status()).toBe(200);
    expect(body.name).toBe(updatePet.name);
    expect(body.status).toBe(updatePet.status);
  });

  test("Delete a pet", { tag: "@flaky" }, async ({ request }) => {
    petApi = new PetApi(new ApiClient(request));

    await petApi.addPet(testPet);

    const deleteResponse = await petApi.deletePet(testPet.id!);
    expect(deleteResponse.status()).toBe(200);

    const getResponse = await petApi.getPetById(testPet.id!);
    expect(getResponse.status()).toBe(404);
  });

  test("Find pets by status", { tag: "@flaky" }, async ({ request }) => {
    petApi = new PetApi(new ApiClient(request));

    await petApi.addPet(testPet);

    const response = await petApi.findPetsByStatus("available");
    const body = (await response.json()) as Pet[];

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body.some((pet) => pet.id == testPet.id)).toBeTruthy();
  });
});
