import { Api } from "@/api/Api";
import {
  ApiErrorMessage,
  ApiSuccessData,
  CreateItemRequestPayload,
  ExtensionMessage,
  Item,
  ItemIdPayload,
} from "@/interfaces/interfaces";
import { setBadge } from "../lib/utils";

export const getItems = async () => {
  const data = await Api.items.getAll();
  processData(data);
};

export const createItem = async (payload: CreateItemRequestPayload) => {
  const data = await Api.items.create(payload);
  if (data.ok) {
    getItems();
  } else {
    chrome.storage.sync.set({ itemsError: data.message });
  }
};

export const completeItem = async (payload: ItemIdPayload) => {
  const data = await Api.items.markAsComplete(payload);
  if (data.ok) {
    getItems();
  } else {
    chrome.storage.sync.set({ itemsError: data.message });
  }
};

export const removeItem = async (payload: ItemIdPayload) => {
  const data = await Api.items.remove(payload);
  if (data.ok) {
    getItems();
  } else {
    chrome.storage.sync.set({ itemsError: data.message });
  }
};

function processData(data: ApiSuccessData<Item[]> | ApiErrorMessage) {
  if (data.ok) {
    chrome.runtime.sendMessage<ExtensionMessage>({
      type: "GET_ITEMS_RESPONSE",
      payload: data,
    });
    chrome.storage.sync.remove("itemsError");
    setBadge(data.data.filter((item) => !item.completed).length);
  } else {
    chrome.storage.sync.set({ itemsError: data.message });
  }
}
