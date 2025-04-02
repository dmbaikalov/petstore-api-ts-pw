import { ApiClient } from "@src/utils/api.client";
import { User, UserApiResponse } from "../models/user.model";

export class UserApi {
  constructor(private apiClient: ApiClient) {}

  /**
   * Creates a new user
   * @param user - The user data to create
   * @returns Promise with API response
   */
  async createUser(user: User): Promise<UserApiResponse> {
    const response = await this.apiClient.post("user", user);
    if (response.status() === 404) {
      throw new Error(`Endpoint not found`);
    }
    return response.json();
  }

  /**
   * Creates multiple users with array input
   * @param users - Array of user objects
   * @returns Promise with API response
   */
  async createUsersWithArray(users: User[]): Promise<UserApiResponse> {
    const response = await this.apiClient.post("user/createWithArray", users);
    return response.json();
  }

  /**
   * Logs user into the system
   * @param username - The username for login
   * @param password - The password for login
   * @returns Promise with login response
   */
  async login(username: string, password: string): Promise<UserApiResponse> {
    const response = await this.apiClient.get("user/login", {
      username,
      password,
    });
    return response.json();
  }

  /**
   * Logs out current logged in user session
   * @returns Promise with logout response
   */
  async logout(): Promise<UserApiResponse> {
    const response = await this.apiClient.get("user/logout");
    return response.json();
  }

  /**
   * Gets user by username
   * @param username - The name of the user to get
   * @returns Promise with user data
   */
  async getUser(username: string): Promise<User> {
    const response = await this.apiClient.get(`user/${username}`);
    return response.json();
  }

  /**
   * Updates an existing user
   * @param username - The name of the user to update
   * @param user - Updated user object
   * @returns Promise with API response
   */
  async updateUser(username: string, user: User): Promise<UserApiResponse> {
    const response = await this.apiClient.put(`user/${username}`, user);
    return response.json();
  }

  /**
   * Deletes a user
   * @param username - The name of the user to delete
   * @returns Promise with API response
   */
  async deleteUser(username: string): Promise<UserApiResponse> {
    const resposne = await this.apiClient.delete(`user/${username}`);
    return resposne.json();
  }
}
