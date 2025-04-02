import { ApiClient } from "@src/utils/api-client";
import { Pet } from "@src/models/pet.model";

export class PetApi {
  constructor(private apiClient: ApiClient) {}

  async addPet(pet: Pet) {
    return this.apiClient.post("pet", pet);
  }

  async updatePet(pet: Pet) {
    return this.apiClient.put("pet", pet);
  }

  async getPetById(petId: number) {
    return this.apiClient.get(`pet/${petId}`);
  }

  async deletePet(petId: number) {
    return this.apiClient.delete(`pet/${petId}`);
  }

  async findPetsByStatus(status: "available" | "pending" | "sold") {
    return this.apiClient.get("pet/findByStatus", { status });
  }
}
