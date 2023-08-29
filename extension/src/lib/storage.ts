import { StorageChangesCallback } from "@/interfaces";
import { emailKey, errorKey, tokenKey } from "./utils";

const getItem = async <T>(key: string): Promise<T | undefined> => {
  return (await chrome.storage.sync.get(key))[key];
};

const setItems = async (items: Record<string, unknown>) => {
  return chrome.storage.sync.set(items);
};

export const storage = {
  getToken: async () => getItem<string>(tokenKey),

  getEmail: async () => getItem<string>(emailKey),

  setItems: async (items: Record<string, unknown>) => setItems(items),

  setError: async (message: string) => setItems({ [errorKey]: message }),

  remove: async (key: string) => chrome.storage.sync.remove(key),

  clear: async () => chrome.storage.sync.clear(),

  onChanged: {
    addListener: async (callback: StorageChangesCallback) => {
      return chrome.storage.sync.onChanged.addListener(callback);
    },

    removeListener: async (callback: StorageChangesCallback) => {
      return chrome.storage.sync.onChanged.removeListener(callback);
    },
  },
};
