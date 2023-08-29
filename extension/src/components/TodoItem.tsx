"use client";

import { useItems } from "@/hooks/useItems";
import { Item } from "@/interfaces";
import { cn, formatDatetime } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const TodoItem = ({ item }: { item: Item }) => {
  const { markItemAsComplete, removeItem } = useItems();
  return (
    <div className="flex items-center justify-between w-[334px] min-h-[47px] gap-2">
      <div className="flex flex-col flex-1 w-0">
        <p
          className={cn(
            item.completed && "line-through",
            "font-semibold break-words",
          )}
        >
          {item.content}
        </p>
        <div className="text-[0.6rem] grid grid-cols-2">
          <p>Adicionada:</p>
          <p>{formatDatetime(item.created_at)}</p>
        </div>
        {item.completed && (
          <div className="text-[0.6rem] grid grid-cols-2">
            <p>Finalizada:</p>
            <p>{formatDatetime(item.updated_at)}</p>
          </div>
        )}
      </div>
      <div className="flex-none w-[85px]">
        {item.completed ? (
          <div className="flex items-center gap-1">
            <Badge variant={"done"}>Feito</Badge>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeItem(item.id)}
            >
              <Trash2Icon className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            disabled={item.completed}
            onClick={() => markItemAsComplete(item.id)}
            size={"sm"}
            variant={item.completed ? "ghost" : "default"}
            className={"bg-emerald-500 text-emerald-100"}
          >
            Completar
          </Button>
        )}
      </div>
    </div>
  );
};
