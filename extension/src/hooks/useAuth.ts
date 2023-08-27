import { ExtensionMessage } from "@/interfaces/interfaces";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const tokenKey = "access_token";
    const emailKey = "email";
    const authErrorKey = "authError";

    const authError = (await chrome.storage.sync.get(authErrorKey))[
      authErrorKey
    ];
    if (authError) {
      setAuthError(authError);
    }

    const accessToken = (await chrome.storage.sync.get(tokenKey))[tokenKey];
    if (accessToken) {
      const email = (await chrome.storage.sync.get(emailKey))[emailKey];
      setEmail(email);
      chrome.runtime.sendMessage<ExtensionMessage>({
        type: "GET_ITEMS_REQUEST",
        payload: null,
      });
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const onStorageChanged = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.access_token?.newValue && changes.email?.newValue) {
        const email = changes.email.newValue;
        setIsAuthorized(true);
        setEmail(email);
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: "GET_ITEMS_REQUEST",
          payload: null,
        });
      } else if (changes.access_token?.oldValue && changes.email?.oldValue) {
        setIsAuthorized(false);
        setEmail("");
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: "CLEAR_ITEMS_REQUEST",
          payload: null,
        });
      }
      if (changes.authError?.newValue) {
        setAuthError(changes.authError.newValue);
      } else {
        setAuthError(null);
      }
    };

    chrome.storage.sync.onChanged.addListener(onStorageChanged);

    return () => {
      chrome.storage.sync.onChanged.removeListener(onStorageChanged);
    };
  }, []);

  const logout = () => {
    chrome.storage.sync.clear();
  };

  const clearAuthErrors = () => {
    chrome.storage.sync.remove("authError");
  };

  return { email, isAuthorized, logout, authError, clearAuthErrors };
};
