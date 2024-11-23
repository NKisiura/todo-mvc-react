import { TodoFilter } from "../types/todo-filter";

type FooterProps = {
  readonly remainingTodosCount: number;
  readonly filter: TodoFilter;
  readonly onClearCompletedTodos: () => void;
  readonly onFilterChange: (filter: TodoFilter) => void;
};

export const TodoFooter = ({
  remainingTodosCount,
  filter: currentFilter,
  onClearCompletedTodos,
  onFilterChange,
}: FooterProps) => {
  const filters: TodoFilter[] = ["all", "active", "completed"];
  const remainingCountString = `${remainingTodosCount} ${remainingTodosCount > 1 ? "items" : "item"} left!`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm font-extralight text-teal-900 shadow-md sm:flex-row">
        <span>{remainingCountString}</span>
        <div className="flex gap-1.5">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`rounded-md border px-2 capitalize ${currentFilter === filter ? "border-teal-400" : "border-transparent hover:border-teal-400"}`}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="hover:underline"
          onClick={onClearCompletedTodos}
        >
          Clear All Completed
        </button>
      </div>
      <span className="text-xs font-extralight text-teal-900/70">
        Double-click to edit a todo
      </span>
    </div>
  );
};
