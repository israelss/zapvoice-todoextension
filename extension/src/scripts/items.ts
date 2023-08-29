import { Api } from "@/api/Api";
import {
  ApiErrorMessage,
  ApiSuccessData,
  CreateItemRequestPayload,
  Item,
  ItemIdPayload,
} from "@/interfaces";
import { errorKey, runtime, storage } from "@/lib/utils";

export const getItems = async () => {
  await storage.remove(errorKey);
  const data = await Api.items.getAll();
  processData(data);
};

export const createItem = async (payload: CreateItemRequestPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.create(payload);
  data.ok ? getItems() : storage.setError(data.message);
};

export const completeItem = async (payload: ItemIdPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.markAsComplete(payload);
  data.ok ? getItems() : storage.setError(data.message);
};

export const removeItem = async (payload: ItemIdPayload) => {
  await storage.remove(errorKey);
  const data = await Api.items.remove(payload);
  data.ok ? getItems() : storage.setError(data.message);
};

async function processData(data: ApiSuccessData<Item[]> | ApiErrorMessage) {
  if (data.ok) {
    runtime.sendMessage({
      type: "GET_ITEMS_RESPONSE",
      payload: data,
    });
  } else {
    storage.setError(data.message);
  }
}
