import { Api } from "@/api/Api";
import { ExtensionMessage } from "@/interfaces/interfaces";
import { getToken, setBadge } from "@/lib/utils";
import { login, register } from "./auth";
import { completeItem, createItem, getItems, removeItem } from "./items";

chrome.runtime.onInstalled.addListener(async () => {
  const accessToken = await getToken();
  if (accessToken !== undefined) {
    const data = await Api.items.getAll();
    if (data.ok) {
      setBadge(data.data.filter((item) => !item.completed).length);
    }
  }
});

chrome.runtime.onMessage.addListener(
  async ({ type, payload }: ExtensionMessage) => {
    switch (type) {
      case "LOGIN_REQUEST": {
        await login(payload);
        break;
      }
      case "REGISTER_REQUEST": {
        await register(payload);
        break;
      }
      case "GET_ITEMS_REQUEST": {
        await getItems();
        break;
      }
      case "CREATE_ITEM_REQUEST": {
        await createItem(payload);
        break;
      }
      case "COMPLETE_ITEM_REQUEST": {
        await completeItem(payload);
        break;
      }
      case "REMOVE_ITEM_REQUEST": {
        await removeItem(payload);
        break;
      }
    }
  }
);
