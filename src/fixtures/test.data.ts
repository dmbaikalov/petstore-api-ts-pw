import { Pet } from "@src/models/pet.model";
import { Order } from "@src/models/store.model";
import { User } from "@src/models/user.model";

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

export const testUser: User = {
  id: 39,
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  password: "password123",
  phone: "1234567890",
  userStatus: 1,
};

/**
 * Helper function to generate user data
 * @param overrides - Partial user data to override defaults
 * @returns A complete User object
 */
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    ...testUser,
    ...overrides,
  };
}

export const testUsersArray: User[] = [
  createTestUser({ id: 1, username: "testuser1" }),
  createTestUser({ id: 2, username: "testuser2" }),
  createTestUser({ id: 3, username: "testuser3" }),
];
