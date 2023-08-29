import { StorageChangesCallback } from "@/interfaces";
import { emailKey, errorKey, setBadge, storage, tokenKey } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useItems } from "./useItems";

export const useAuth = () => {
  const { clearItems, getItems } = useItems();
  const [email, setEmail] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  function logout() {
    storage.clear();
    setBadge(null);
  }

  useEffect(() => {
    async function checkAuth() {
      const [accessToken, email] = await Promise.all([
        storage.getToken(),
        storage.getEmail(),
      ]);
      if (accessToken !== undefined && email !== undefined) {
        setEmail(email);
        setIsAuthorized(true);
        getItems();
      } else {
        setBadge(null);
      }
    }

    storage.remove(errorKey);
    checkAuth();
  }, [getItems]);

  useEffect(() => {
    const onStorageChanged: StorageChangesCallback = (changes) => {
      const tokenChanges = changes[tokenKey];
      if (tokenChanges?.newValue !== undefined) {
        setIsAuthorized(true);
        setEmail(changes[emailKey]?.newValue ?? "");
        getItems();
      } else if (tokenChanges?.oldValue !== undefined) {
        setIsAuthorized(false);
        setEmail("");
        clearItems();
      }
    };

    storage.onChanged.addListener(onStorageChanged);

    return () => {
      storage.onChanged.removeListener(onStorageChanged);
    };
  }, [clearItems, getItems]);

  return { email, isAuthorized, logout };
};
