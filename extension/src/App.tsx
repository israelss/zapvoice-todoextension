import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { StorageChangesCallback } from "@/interfaces";
import { errorKey, storage } from "@/lib/utils";
import { AuthPage } from "@/pages/AuthPage";
import { ItemsPage } from "@/pages/ItemsPage";
import { useCallback, useEffect, useState } from "react";

function App() {
  const { isAuthorized } = useAuth();
  const { toast, dismiss } = useToast();

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

  useEffect(() => {
    const onStorageChanged: StorageChangesCallback = (changes) => {
      if (changes[errorKey]?.newValue !== undefined) {
        const { id } = showErrorToast(changes[errorKey].newValue);
        setToastId(id);
      } else {
        if (toastId !== null) {
          dismiss(toastId);
        }
        storage.remove(errorKey);
      }
    };

    storage.onChanged.addListener(onStorageChanged);

    return () => {
      storage.onChanged.removeListener(onStorageChanged);
    };
  }, [dismiss, showErrorToast, toastId]);

  return (
    <>
      <div className="flex flex-col min-h-[422px] w-[400px] p-4">
        {isAuthorized ? <ItemsPage /> : <AuthPage />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
