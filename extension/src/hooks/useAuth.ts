import { useToast } from "@/components/ui/use-toast";
import { StorageChangesCallback } from "@/interfaces";
import { runtime, setBadge, storage } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const { toast, dismiss } = useToast();

  const [email, setEmail] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [toastId, setToastId] = useState<string | null>(null);

  const showErrorToast = useCallback(
    (message: string) =>
      toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      }),
    [toast],
  );

  function clearAuthErrors() {
    storage.remove(import.meta.env.VITE_ERROR_KEY);
  }

  async function checkAuth() {
    const accessToken = await storage.getToken();
    const email = await storage.getEmail();
    if (accessToken !== undefined && email !== undefined) {
      setEmail(email);
      runtime.sendMessage({
        type: "GET_ITEMS_REQUEST",
        payload: null,
      });
      setIsAuthorized(true);
    }
  }

  function logout() {
    storage.clear();
    setBadge(null);
  }

  useEffect(() => {
    clearAuthErrors();
    checkAuth();
  }, []);

  useEffect(() => {
    const onStorageChanged: StorageChangesCallback = (changes) => {
      if (changes.authError?.newValue !== undefined) {
        const { id } = showErrorToast(changes.authError.newValue);
        setToastId(id);
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
        runtime.sendMessage({
          type: "GET_ITEMS_REQUEST",
          payload: null,
        });
      } else {
        setIsAuthorized(false);
        setEmail("");
        runtime.sendMessage({
          type: "CLEAR_ITEMS_REQUEST",
          payload: null,
        });
      }
    };

    storage.onChanged.addListener(onStorageChanged);

    return () => {
      storage.onChanged.removeListener(onStorageChanged);
    };
  }, [dismiss, showErrorToast, toastId]);

  return { email, isAuthorized, logout, clearAuthErrors };
};
