import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useItems } from "@/hooks/useItems";
import { AuthPage } from "@/pages/auth";
import { useState } from "react";

function App() {
  const [newTodoValue, setNewTodoValue] = useState<string>("");
  const { items, addItem } = useItems(newTodoValue);
  const { isAuthorized, email, logout } = useAuth();

  return (
    <div className="flex flex-col h-[400px] w-[350px] p-4">
      {!isAuthorized && <AuthPage />}
      {isAuthorized && (
        <>
          <div className="flex items-center justify-between mb-3 font-semibold">
            <h1>Minhas tarefas ({email})</h1>
            <Button onClick={logout} variant={"destructive"}>
              Sair
            </Button>
          </div>
          <div className="flex items-center w-full max-w-sm space-x-2">
            <Button onClick={addItem} disabled={!(newTodoValue.length > 0)}>
              Adicionar
            </Button>
            <Input
              onChange={({ target: { value } }) => setNewTodoValue(value)}
              placeholder="Nova tarefa"
            />
          </div>

          {items.map((item) => (
            <div key={item.id}>{item.content}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
