import { useEffect, useState } from "react";
import { ExtensionMessage } from "@/interfaces/interfaces";
import { useItems } from "./useItems";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { clearItems } = useItems();

  useEffect(() => {
    (async () => {
      const tokenKey = "access_token";
      const emailKey = "email";
      const accessToken = (await chrome.storage.sync.get(tokenKey))[tokenKey];
      if (accessToken) {
        setIsAuthorized(true);
        const email = (await chrome.storage.sync.get(emailKey))[emailKey];
        setEmail(email);
      }
    })();
  }, []);

  useEffect(() => {
    const onStorageChanged = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.access_token && changes.email) {
        const accessToken = changes.access_token.newValue;
        setIsAuthorized(Boolean(accessToken));
        const email = changes.email.newValue;
        if (email) {
          setEmail(email);
          chrome.runtime.sendMessage<ExtensionMessage>({
            type: "GET_ITEMS_REQUEST",
            payload: null,
          });
        } else {
          clearItems();
        }
      }
    };

    chrome.storage.sync.onChanged.addListener(onStorageChanged);

    return () => {
      chrome.storage.sync.onChanged.removeListener(onStorageChanged);
    };
  }, [clearItems]);

  const logout = () => {
    chrome.storage.sync.clear();
  };

  return { email, isAuthorized, logout };
};
