import { Api } from "@/api/Api";
import {
  ApiErrorMessage,
  ApiSuccessData,
  CreateItemRequestPayload,
  Item,
  ItemIdPayload,
} from "@/interfaces";
import { runtime, setBadge, storage } from "@/lib/utils";

export const getItems = async () => {
  const data = await Api.items.getAll();
  processData(data);
};

export const createItem = async (payload: CreateItemRequestPayload) => {
  const data = await Api.items.create(payload);
  if (data.ok) {
    getItems();
  } else {
    storage.setItems({ [import.meta.env.VITE_ERROR_KEY]: data.message });
  }
};

export const completeItem = async (payload: ItemIdPayload) => {
  const data = await Api.items.markAsComplete(payload);
  if (data.ok) {
    getItems();
  } else {
    storage.setItems({ [import.meta.env.VITE_ERROR_KEY]: data.message });
  }
};

export const removeItem = async (payload: ItemIdPayload) => {
  const data = await Api.items.remove(payload);
  if (data.ok) {
    getItems();
  } else {
    storage.setItems({ [import.meta.env.VITE_ERROR_KEY]: data.message });
  }
};

function processData(data: ApiSuccessData<Item[]> | ApiErrorMessage) {
  if (data.ok) {
    runtime.sendMessage({
      type: "GET_ITEMS_RESPONSE",
      payload: data,
    });
    storage.remove(import.meta.env.VITE_ERROR_KEY);
    setBadge(data.data.filter((item) => !item.completed).length);
  } else {
    storage.setItems({ [import.meta.env.VITE_ERROR_KEY]: data.message });
  }
}
