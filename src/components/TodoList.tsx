import { ReactNode } from "react";

interface TodoListProps {
  readonly children: ReactNode;
}

export const TodoList = ({ children }: TodoListProps) => {
  return (
    <div className="flex max-h-[420px] flex-col gap-1 overflow-y-auto rounded-xl bg-teal-200 p-1 shadow-md">
      {children}
    </div>
  );
};
