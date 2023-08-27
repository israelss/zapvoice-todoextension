import { useToast } from "@/components/ui/use-toast";
import { ExtensionMessage } from "@/interfaces/interfaces";
import { useCallback, useEffect, useState } from "react";
import { getEmail, getToken, setBadge } from "../lib/utils";

export const useAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [toastId, setToastId] = useState<string | null>(null);
  const { toast, dismiss } = useToast();

  const showErrorToast = useCallback(
    (message: string) => {
      const { id } = toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      });
      setToastId(id);
    },
    [toast]
  );

  useEffect(() => {
    clearAuthErrors();
    checkAuth();
  }, []);

  useEffect(() => {
    const onStorageChanged = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.authError?.newValue !== undefined) {
        showErrorToast(changes.authError.newValue);
        return;
      } else {
        if (toastId !== null) {
          dismiss(toastId);
        }
        clearAuthErrors();
      }
      if (
        changes.access_token?.newValue !== undefined &&
        changes.email?.newValue !== undefined
      ) {
        const email = changes.email.newValue;
        setIsAuthorized(true);
        setEmail(email);
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: "GET_ITEMS_REQUEST",
          payload: null,
        });
      } else {
        setIsAuthorized(false);
        setEmail("");
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: "CLEAR_ITEMS_REQUEST",
          payload: null,
        });
      }
    };

    chrome.storage.sync.onChanged.addListener(onStorageChanged);

    return () => {
      chrome.storage.sync.onChanged.removeListener(onStorageChanged);
    };
  }, [dismiss, showErrorToast, toastId]);

  const logout = () => {
    chrome.storage.sync.clear();
    setBadge(null);
  };

  const clearAuthErrors = () => {
    chrome.storage.sync.remove("authError");
  };

  const checkAuth = async () => {
    const accessToken = await getToken();
    const email = await getEmail();
    if (accessToken !== undefined && email !== undefined) {
      setEmail(email);
      chrome.runtime.sendMessage<ExtensionMessage>({
        type: "GET_ITEMS_REQUEST",
        payload: null,
      });
      setIsAuthorized(true);
    }
  };

  return { email, isAuthorized, logout, clearAuthErrors };
};
