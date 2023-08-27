import { useToast } from "@/components/ui/use-toast";
import { ExtensionMessage } from "@/interfaces/interfaces";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { toast } = useToast();

  const showErrorToast = useCallback(
    (message: string) =>
      toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      }),
    [toast]
  );

  useEffect(() => {
    const checkAuth = async () => {
      const tokenKey = "access_token";
      const emailKey = "email";
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
    };

    clearAuthErrors();
    checkAuth();
  }, []);

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
        showErrorToast(changes.authError.newValue);
        clearAuthErrors();
      }
    };

    chrome.storage.sync.onChanged.addListener(onStorageChanged);

    return () => {
      chrome.storage.sync.onChanged.removeListener(onStorageChanged);
    };
  }, [showErrorToast]);

  const logout = () => {
    chrome.storage.sync.clear();
  };

  const clearAuthErrors = () => {
    chrome.storage.sync.remove("authError");
  };

  return { email, isAuthorized, logout, clearAuthErrors };
};
