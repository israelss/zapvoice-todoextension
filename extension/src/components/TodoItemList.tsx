import { useItems } from "@/hooks/useItems";
import { Item } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";
import { EmptyTodoList } from "./EmptyTodoList";
import { TodoItem } from "./TodoItem";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export const TodoItemList = ({ showCompleted }: { showCompleted: boolean }) => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const { items } = useItems();

  useEffect(() => {
    setFilteredItems(items.filter((item) => showCompleted || !item.completed));
  }, [items, showCompleted]);

  return (
    <ScrollArea className="mt-2 h-[300px] rounded-md border p-4 ">
      {filteredItems.length === 0 ? (
        <EmptyTodoList />
      ) : (
        filteredItems.map((item, index, array) => (
          <div key={item.id}>
            <TodoItem item={item} />
            {index < array.length - 1 && <Separator className="my-2" />}
          </div>
        ))
      )}
    </ScrollArea>
  );
};
