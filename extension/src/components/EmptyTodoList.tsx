import { LaughIcon } from "lucide-react";

export const EmptyTodoList = () => {
  return (
    <div className="grid w-full h-[232px] place-items-center place-content-center gap-4">
      <LaughIcon className="w-20 h-20 stroke-1" />
      <h1 className="text-2xl">Sem tarefas</h1>
    </div>
  );
};
