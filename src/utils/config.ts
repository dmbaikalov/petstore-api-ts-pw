import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || "https://petstore.swagger.io/v2",
  apiKey: process.env.API_KEY || "",
};
