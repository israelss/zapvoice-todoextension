import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/pages/AuthPage";
import { ItemsPage } from "./pages/ItemsPage";

function App() {
  const { isAuthorized } = useAuth();

  return (
    <div className="flex flex-col h-[414px] w-[350px] p-4">
      {isAuthorized ? <ItemsPage /> : <AuthPage />}
    </div>
  );
}

export default App;
