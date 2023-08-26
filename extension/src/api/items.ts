import {
  CreateItemRequest,
  FetchedItem,
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
    const data = (await get<FetchedItem[]>(`${apiBaseUrl}/items`)) ?? [];
    return (
      data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at),
      })) ?? []
    );
  },

  markAsComplete: async function ({
    id,
  }: MarkAsCompleteItemRequest): Promise<boolean> {
    const data = await patch<Item[]>(`${apiBaseUrl}/items/${id}/complete`);
    return data === null ? false : true;
  },
});
