import { StorageChangesCallback } from "@/interfaces";

const getItem = async <T>(key: string): Promise<T | undefined> => {
  return (await chrome.storage.sync.get(key))[key];
};

export const storage = {
  getToken: async () => getItem<string>(import.meta.env.VITE_TOKEN_KEY),

  getEmail: async () => getItem<string>(import.meta.env.VITE_EMAIL_KEY),

  setItems: async (items: Record<string, unknown>) => {
    return chrome.storage.sync.set(items);
  },

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
