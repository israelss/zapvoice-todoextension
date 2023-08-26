import {
  CreateItemRequestPayload,
  Item,
  ItemIdPayload,
} from "../interfaces/interfaces";
import { sendDelete, sendGet, sendPatch, sendPost } from "./utils";

export const itemsApi = (apiBaseUrl: string) => ({
  create: async function ({
    content,
  }: CreateItemRequestPayload): Promise<boolean> {
    const data = await sendPost<boolean>(`${apiBaseUrl}/items`, { content });
    return data ?? false;
  },

  getAll: async function (): Promise<Item[]> {
    return (await sendGet<Item[]>(`${apiBaseUrl}/items`)) ?? [];
  },

  markAsComplete: async function ({ id }: ItemIdPayload): Promise<boolean> {
    const data = await sendPatch<boolean>(`${apiBaseUrl}/items/${id}/complete`);
    return data ?? false;
  },

  remove: async function ({ id }: ItemIdPayload): Promise<boolean> {
    const data = await sendDelete<boolean>(`${apiBaseUrl}/items/${id}`);
    return data ?? false;
  },
});
