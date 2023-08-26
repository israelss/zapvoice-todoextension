import { authApi } from "./auth";
import { itemsApi } from "./items";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const Api = {
  auth: authApi(API_URL),
  items: itemsApi(API_URL),
};
