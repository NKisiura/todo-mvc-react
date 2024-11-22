import { TodoFilter } from "../types/todo-filter";

interface FooterProps {
  readonly itemsLeftCount: number;
  readonly filter: TodoFilter;
  readonly onClearCompletedTodos: () => void;
  readonly onFilterChange: (filter: TodoFilter) => void;
}

export const TodoFooter = ({
  itemsLeftCount,
  filter: currentFilter,
  onClearCompletedTodos,
  onFilterChange,
}: FooterProps) => {
  const filters: TodoFilter[] = ["all", "active", "completed"];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-sm font-extralight text-teal-900 shadow-md sm:flex-row">
        <span>
          {itemsLeftCount} {itemsLeftCount > 1 ? "items" : "item"} left!
        </span>
        <div className="flex gap-1.5">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`rounded-md border border-transparent px-2 capitalize hover:border-teal-400 ${currentFilter === filter ? "!border-teal-400" : ""}`}
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
