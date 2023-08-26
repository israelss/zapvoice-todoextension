import { useItems } from "@/hooks/useItems";
import { Item } from "@/interfaces/interfaces";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const TodoItem = ({ item }: { item: Item }) => {
  const { markItemAsComplete } = useItems();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p
          className={cn(
            item.completed && "line-through",
            "font-semibold text-base"
          )}
        >
          {item.content}
        </p>
        <p className="text-xs">
          {Intl.DateTimeFormat("pt-br", {
            dateStyle: "short",
            timeStyle: "medium",
          }).format(new Date(item.created_at))}
        </p>
      </div>
      <Button
        disabled={item.completed}
        onClick={() => markItemAsComplete(item.id)}
        size={"sm"}
        variant={item.completed ? "ghost" : "default"}
        className={
          item.completed
            ? "bg-cyan-300 text-cyan-900"
            : "bg-emerald-500 text-emerald-100"
        }
      >
        {item.completed ? "Feito" : "Completar"}
      </Button>
    </div>
  );
};
