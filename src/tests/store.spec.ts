import { expect } from "@playwright/test";
import { StoreApi } from "../api/store.api";
import { testOrder } from "../fixtures/test.data";
import { Order } from "../models/store.model";
import { test } from "../fixtures/api.fixtures";

test.describe("Store API Tests Suite", () => {
  let storeApi: StoreApi;
  let createOrderId: number;

  test("Place a new order", async ({ storeApi }) => {
    const response = await storeApi.placeOrder(testOrder);
    expect(response.status()).toBe(200);

    const body = (await response.json()) as Order;
    expect(body.id).toBeDefined();
    expect(body.petId).toBe(testOrder.petId);
    expect(body.status).toBe(testOrder.status);

    createOrderId = body.id!;
  });

  test("Get order by ID", async ({ storeApi }) => {
    const orderResponse = await storeApi.placeOrder(testOrder);
    const order = (await orderResponse.json()) as Order;

    const getResponse = await storeApi.getOrderById(order.id!);

    expect(getResponse.status()).toBe(200);
    const retrivedOrder = (await getResponse.json()) as Order;
    expect(retrivedOrder).toEqual(order);
  });

  test("Delete an order", async ({ storeApi }) => {
    const orderResponse = await storeApi.placeOrder(testOrder);
    const order = (await orderResponse.json()) as Order;

    const deleteResponse = await storeApi.deleteOrder(order.id!);
    expect(deleteResponse.status()).toBe(200);

    const getResponse = await storeApi.getOrderById(order.id!);
    expect(getResponse.status()).toBe(404);
  });

  test("Get store inventory", async ({ storeApi }) => {
    const response = await storeApi.getInventory();
    expect(response.status()).toBe(200);

    const inventory = await response.json();
    expect(inventory).toHaveProperty("available");
    expect(inventory).toHaveProperty("pending");
    expect(inventory).toHaveProperty("sold");
  });

  test("Get non-existent order", async ({ storeApi }) => {
    const response = await storeApi.getOrderById(99999);

    expect(response.status()).toBe(404);
  });
});
