import { ExtensionMessage, Item } from "@/interfaces/interfaces";
import { setBadge } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsError, setItemsError] = useState<string | null>(null);

  useEffect(() => {
    const onMessage = ({ type, payload }: ExtensionMessage) => {
      switch (type) {
        case "GET_ITEMS_RESPONSE": {
          if (payload.ok) {
            const count = payload.data.filter((item) => !item.completed).length;

            setBadge(count);
            setItems(payload.data);
          } else {
            setItemsError(payload.message);
          }
          break;
        }
        case "CLEAR_ITEMS_REQUEST": {
          setItems([]);
          break;
        }
      }
    };

    chrome.runtime.onMessage.addListener(onMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onMessage);
    };
  }, []);

  const addItem = (content: string) => {
    chrome.runtime.sendMessage<ExtensionMessage>({
      type: "CREATE_ITEM_REQUEST",
      payload: { content },
    });
  };

  const markItemAsComplete = (itemId: string) => {
    chrome.runtime.sendMessage<ExtensionMessage>({
      type: "COMPLETE_ITEM_REQUEST",
      payload: { id: itemId },
    });
  };

  const removeItem = (itemId: string) => {
    chrome.runtime.sendMessage<ExtensionMessage>({
      type: "REMOVE_ITEM_REQUEST",
      payload: { id: itemId },
    });
  };

  return {
    items,
    addItem,
    markItemAsComplete,
    removeItem,
    itemsError,
  };
};
