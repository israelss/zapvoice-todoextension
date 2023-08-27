import { Header } from "@/components/Header";
import { NewTodoForm } from "@/components/NewTodoForm";
import { TodoItemList } from "@/components/TodoItemList";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const ItemsPage = () => {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  return (
    <>
      <Header />
      <div className="flex items-center my-3 space-x-2">
        <Switch
          id="show-completed"
          checked={showCompleted}
          onCheckedChange={setShowCompleted}
        />
        <Label htmlFor="show-completed">Mostrar tarefas completas</Label>
      </div>
      <NewTodoForm />
      <TodoItemList showCompleted={showCompleted} />
    </>
  );
};
