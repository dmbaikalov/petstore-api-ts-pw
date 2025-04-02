import { Pet } from "@src/models/pet.model";
import { Order } from "@src/models/store.model";

export const testPet: Pet = {
  id: 39,
  name: "Luna",
  category: {
    id: 39,
    name: "Dogs",
  },
  photoUrls: [""],
  tags: [
    {
      id: 39,
      name: "friendly",
    },
  ],
  status: "available",
};

export const testOrder: Order = {
  petId: 39,
  quantity: 1,
  status: "placed",
  complete: false,
};

/**
 * Helper function to generate order data
 * @param overrides - Partial order data to override defaults
 * @returns A complete Order object
 */
export function createTestOrder(overrides: Partial<Order> = {}): Order {
  return {
    ...testOrder,
    ...overrides,
  };
}
