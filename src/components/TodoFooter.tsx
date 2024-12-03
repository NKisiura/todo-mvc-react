import { ReactNode } from "react";

type FooterProps = {
  readonly remainingTodosCount: number;
  readonly content: ReactNode;
};

export const TodoFooter = ({ remainingTodosCount, content }: FooterProps) => {
  const remainingCountString = `${remainingTodosCount} ${remainingTodosCount > 1 ? "items" : "item"} left!`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm font-extralight text-teal-900 shadow-md sm:flex-row">
        <span>{remainingCountString}</span>
        {content}
      </div>
      <span className="text-xs font-extralight text-teal-900/70">
        Double-click to edit a todo
      </span>
    </div>
  );
};
