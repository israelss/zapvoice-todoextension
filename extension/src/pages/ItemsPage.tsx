import { TodoItem } from "@/components/TodoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useItems } from "@/hooks/useItems";
import { useRef, useState } from "react";

export const ItemsPage = () => {
  const newTodoInputRef = useRef<HTMLInputElement>(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true);
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const { items, addItem } = useItems();
  const { email, logout } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between font-semibold">
        <h1>Minhas tarefas ({email})</h1>
        <Button size={"sm"} onClick={logout} variant={"destructive"}>
          Sair
        </Button>
      </div>
      <div className="flex items-center my-3 space-x-2">
        <Switch
          id="show-completed"
          checked={showCompleted}
          onCheckedChange={setShowCompleted}
        />
        <Label htmlFor="show-completed">Mostrar tarefas completas</Label>
      </div>
      <div className="flex items-center w-full max-w-sm space-x-2">
        <Button
          size={"sm"}
          onClick={() => {
            const newTodo = newTodoInputRef.current;
            if (newTodo !== null) {
              addItem(newTodo.value);
              newTodo.value = "";
              newTodo.focus();
              setAddButtonDisabled(true);
            }
          }}
          disabled={addButtonDisabled}
        >
          Adicionar
        </Button>
        <Input
          onChange={({ target: { value } }) =>
            setAddButtonDisabled(value === "")
          }
          ref={newTodoInputRef}
          placeholder="Nova tarefa"
        />
      </div>

      <ScrollArea className="mt-2 h-[300px] rounded-md border p-4 ">
        {items
          .filter((item) => showCompleted || !item.completed)
          .map((item, index, array) => (
            <div key={item.id}>
              <TodoItem item={item} />
              {index < array.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
      </ScrollArea>
    </>
  );
};
