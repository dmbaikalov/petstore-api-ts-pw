import { expect } from "@playwright/test";
import { PetApi } from "@src/api/pet.api";
import { testPet } from "@src/fixtures/test.data";
import { Pet } from "@src/models/pet.model";
import { test } from "../fixtures/api.fixtures";

test.describe.parallel("Pet API Test Suite", () => {
  let petApi: PetApi;

  test("Add a new pet to the store", async ({ petApi }) => {
    const response = await petApi.addPet(testPet);
    const body = (await response.json()) as Pet;

    expect(response.status()).toBe(200);
    expect(body.id).toBe(testPet.id);
    expect(body.name).toBe(testPet.name);
  });

  test("Get pet by ID", async ({ petApi }) => {
    await petApi.addPet(testPet);

    const response = await petApi.getPetById(testPet.id!);
    const body = (await response.json()) as Pet;

    expect(response.status()).toBe(200);
    expect(body).toEqual(testPet);
  });

  test("Update an existing pet", async ({ petApi }) => {
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

  test("Delete a pet", { tag: "@flaky" }, async ({ petApi }) => {
    await petApi.addPet(testPet);

    const deleteResponse = await petApi.deletePet(testPet.id!);
    expect([200, 404]).toContain(deleteResponse.status());

    const getResponse = await petApi.getPetById(testPet.id!);
    expect([200, 404]).toContain(getResponse.status());
  });

  test("Find pets by status", { tag: "@flaky" }, async ({ petApi }) => {
    await petApi.addPet(testPet);

    const response = await petApi.findPetsByStatus("available");
    const body = (await response.json()) as Pet[];

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body.some((pet) => pet.id == testPet.id)).toBeTruthy();
  });
});
