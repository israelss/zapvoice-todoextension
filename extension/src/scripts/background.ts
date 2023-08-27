import { ExtensionMessage } from "@/interfaces/interfaces";
import { login, register } from "./auth";
import { completeItem, createItem, getItems, removeItem } from "./items";

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
