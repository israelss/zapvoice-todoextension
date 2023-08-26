import { Api } from "@/api/Api";
import { ExtensionMessage } from "@/interfaces/interfaces";

chrome.runtime.onMessage.addListener(
  async ({ type, payload }: ExtensionMessage) => {
    switch (type) {
      case "LOGIN_REQUEST": {
        const data = await Api.auth.login(payload);
        if (data !== null) {
          const { access_token, email } = data;
          chrome.storage.sync.set({ access_token, email });
        }
        break;
      }
      case "REGISTER_REQUEST": {
        const data = await Api.auth.register(payload);
        if (data !== null) {
          const { access_token, email } = data;
          chrome.storage.sync.set({ access_token, email });
        }
        break;
      }
      case "GET_ITEMS_REQUEST": {
        const items = await Api.items.getAll();
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: "GET_ITEMS_RESPONSE",
          payload: items,
        });
        break;
      }
      case "CREATE_ITEM_REQUEST": {
        const success = await Api.items.create(payload);
        if (success) {
          const items = await Api.items.getAll();
          chrome.runtime.sendMessage<ExtensionMessage>({
            type: "GET_ITEMS_RESPONSE",
            payload: items,
          });
        }
        break;
      }
      case "COMPLETE_ITEM_REQUEST": {
        const success = await Api.items.markAsComplete(payload);
        if (success) {
          const items = await Api.items.getAll();
          chrome.runtime.sendMessage<ExtensionMessage>({
            type: "GET_ITEMS_RESPONSE",
            payload: items,
          });
        }
        break;
      }
      case "REMOVE_ITEM_REQUEST": {
        const success = await Api.items.remove(payload);
        if (success) {
          const items = await Api.items.getAll();
          chrome.runtime.sendMessage<ExtensionMessage>({
            type: "GET_ITEMS_RESPONSE",
            payload: items,
          });
        }
        break;
      }
    }
  }
);
