export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

export interface Inventory {
  [key: string]: number;
}
