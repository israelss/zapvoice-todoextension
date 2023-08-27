import {
  ApiErrorMessage,
  ApiSuccessData,
  CreateItemRequestPayload,
  Item,
  ItemIdPayload,
} from "@/interfaces";
import { sendDelete, sendGet, sendPatch, sendPost } from "./utils";

export const itemsApi = (apiBaseUrl: string) => ({
  create: async function ({
    content,
  }: CreateItemRequestPayload): Promise<
    ApiSuccessData<boolean> | ApiErrorMessage
  > {
    return await sendPost<boolean>(`${apiBaseUrl}/items`, { content });
  },

  getAll: async function (): Promise<ApiSuccessData<Item[]> | ApiErrorMessage> {
    return await sendGet<Item[]>(`${apiBaseUrl}/items`);
  },

  markAsComplete: async function ({
    id,
  }: ItemIdPayload): Promise<ApiSuccessData<boolean> | ApiErrorMessage> {
    return await sendPatch<boolean>(`${apiBaseUrl}/items/${id}/complete`);
  },

  remove: async function ({
    id,
  }: ItemIdPayload): Promise<ApiSuccessData<boolean> | ApiErrorMessage> {
    return await sendDelete<boolean>(`${apiBaseUrl}/items/${id}`);
  },
});
