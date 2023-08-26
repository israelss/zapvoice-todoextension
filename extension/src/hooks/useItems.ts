import { ExtensionMessage, Item } from "@/interfaces/interfaces";
import { useCallback, useEffect, useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const onMessage = ({ type, payload }: ExtensionMessage) => {
      switch (type) {
        case "GET_ITEMS_RESPONSE": {
          setItems(payload);
          break;
        }
        case "CREATE_ITEM_RESPONSE":
        case "COMPLETE_ITEM_RESPONSE":
          if (payload) {
            chrome.runtime.sendMessage<ExtensionMessage>({
              type: "GET_ITEMS_REQUEST",
              payload: null,
            });
          }
          break;
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

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const markItemAsComplete = (itemId: string) => {
    chrome.runtime.sendMessage<ExtensionMessage>({
      type: "COMPLETE_ITEM_REQUEST",
      payload: { id: itemId },
    });
  };

  return { items, addItem, clearItems, markItemAsComplete };
};
