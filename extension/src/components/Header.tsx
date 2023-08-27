import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

export const Header = () => {
  const { email, logout } = useAuth();
  return (
    <>
      <div className="flex items-center justify-between font-semibold">
        <h1>Minhas tarefas ({email})</h1>
        <Button size={"sm"} onClick={logout} variant={"destructive"}>
          Sair
        </Button>
      </div>
    </>
  );
};
