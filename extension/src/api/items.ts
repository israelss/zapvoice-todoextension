import {
  CreateItemRequest,
  Item,
  MarkAsCompleteItemRequest,
} from "../interfaces/interfaces";
import { get, patch, post } from "./utils";

export const itemsApi = (apiBaseUrl: string) => ({
  create: async function ({ content }: CreateItemRequest): Promise<boolean> {
    const data = await post<Item>(`${apiBaseUrl}/items`, { content });
    return data === null ? false : true;
  },

  getAll: async function (): Promise<Item[]> {
    return (await get<Item[]>(`${apiBaseUrl}/items`)) ?? [];
  },

  markAsComplete: async function ({
    id,
  }: MarkAsCompleteItemRequest): Promise<boolean> {
    const data = await patch<Item[]>(`${apiBaseUrl}/items/${id}/complete`);
    return data === null ? false : true;
  },
});
