import { clsx } from "clsx";
import { TodoFilter as TodoFilterType } from "../types/todo-filter";

type TodoFilterProps = {
  readonly filter: TodoFilterType;
  readonly onFilterChange: (filter: TodoFilterType) => void;
};

export const TodoFilter = ({
  filter: currentFilter,
  onFilterChange,
}: TodoFilterProps) => {
  const filters: TodoFilterType[] = ["all", "active", "completed"];

  return (
    <div className="flex gap-1.5">
      {filters.map((filter) => (
        <button
          type="button"
          key={filter}
          className={clsx(
            "rounded-md border px-2 capitalize",
            currentFilter === filter ? "border-teal-400" : (
              "border-transparent hover:border-teal-400"
            ),
          )}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
