import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/pages/AuthPage";
import { ItemsPage } from "@/pages/ItemsPage";

function App() {
  const { isAuthorized } = useAuth();

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
