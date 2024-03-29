import { Item, OnMessageListenerCallback } from "@/interfaces";
import { runtime, setBadge, storage } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const onMessage: OnMessageListenerCallback = ({ type, payload }) => {
      switch (type) {
        case "GET_ITEMS_RESPONSE": {
          if (payload.ok) {
            const count = payload.data.filter((item) => !item.completed).length;

            setBadge(count);
            setItems(payload.data);
          } else {
            storage.setError(payload.message);
          }
          break;
        }
      }
    };

    runtime.onMessage.addListener(onMessage);

    return () => {
      runtime.onMessage.removeListener(onMessage);
    };
  }, []);

  const getItems = useCallback(() => {
    runtime.sendMessage({
      type: "GET_ITEMS_REQUEST",
      payload: null,
    });
  }, []);

  const clearItems = () => {
    setItems([]);
  };

  const addItem = (content: string) => {
    runtime.sendMessage({
      type: "CREATE_ITEM_REQUEST",
      payload: { content },
    });
  };

  const markItemAsComplete = (itemId: string) => {
    runtime.sendMessage({
      type: "COMPLETE_ITEM_REQUEST",
      payload: { id: itemId },
    });
  };

  const removeItem = (itemId: string) => {
    runtime.sendMessage({
      type: "REMOVE_ITEM_REQUEST",
      payload: { id: itemId },
    });
  };

  return {
    items,
    addItem,
    clearItems,
    getItems,
    markItemAsComplete,
    removeItem,
  };
};
