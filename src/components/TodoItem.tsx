import { Todo } from "../types/todo";
import { useState } from "react";

interface TodoProps {
  readonly todo: Todo;
  readonly onDeleteTodo: (todoId: string) => void;
  readonly onToggleTodo: (todoId: string) => void;
  readonly onEditTodo: (todoId: string, updatedTodo: string) => void;
}

export default function TodoItem({
  todo,
  onDeleteTodo,
  onToggleTodo,
  onEditTodo,
}: TodoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);

  return (
    <div
      className={`relative w-full rounded-lg border-2 border-white bg-white px-3 py-2 text-2xl font-light text-teal-900 ${isOnEdit ? "!border-teal-400" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative h-7 min-h-7 w-7 min-w-7 rounded-full border border-teal-600`}
        >
          {todo.isCompleted && (
            <i className="fa-solid fa-check absolute left-1/2 -translate-x-1/2 text-lg text-teal-600"></i>
          )}
          <input
            type="checkbox"
            className="hidden"
            onChange={() => onToggleTodo(todo.id)}
          />
        </label>
        {isOnEdit ?
          <input
            type="text"
            autoFocus
            className="w-full focus:outline-0"
            defaultValue={todo.todo}
            onBlur={() => setIsOnEdit(false)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;

              const inputValue = (e.target as HTMLInputElement).value;
              if (!inputValue.trim()) return;

              onEditTodo(todo.id, inputValue.trim());
              setIsOnEdit(false);
            }}
          />
        : <span
            className={`w-full break-all ${todo.isCompleted ? "text-gray-400/90 line-through" : ""}`}
            onDoubleClick={() => setIsOnEdit(true)}
          >
            {todo.todo}
          </span>
        }
      </div>
      {isHovered && (
        <button
          type="button"
          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-teal-200 bg-white text-base text-teal-600 shadow-md focus:outline-0"
          title="delete todo"
          onClick={() => onDeleteTodo(todo.id)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
}
