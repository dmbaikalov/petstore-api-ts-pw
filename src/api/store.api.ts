import { ApiClient } from "@src/utils/api.client";
import { Order, Inventory } from "../models/store.model";

export class StoreApi {
  constructor(private apiClinet: ApiClient) {}

  /**
   * Places a new order in the store
   * @param order - The order details to be placed
   * @returns Promise containing the API response
   */
  async placeOrder(order: Order) {
    return this.apiClinet.post("store/order", order);
  }

  /**
   * Retrieves an order by its ID
   * @param orderId - The ID of the order to retrieve
   * @returns Promise containing the order details
   * @throws Will throw if order doesn't exist (404)
   */
  async getOrderById(orderId: number) {
    return this.apiClinet.get(`store/order/${orderId}`);
  }

  /**
   * Deletes an order by its ID
   * @param orderId - The ID of the order to delete
   * @returns Promise containing the deletion result
   */
  async deleteOrder(orderId: number) {
    return this.apiClinet.delete(`store/order/${orderId}`);
  }

  /**
   * Gets the current inventory counts by status
   * @returns Promise containing the inventory object
   */
  async getInventory() {
    return this.apiClinet.get("store/inventory");
  }
}
