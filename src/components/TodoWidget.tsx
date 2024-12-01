import { clsx } from "clsx";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TodoFilter } from "./TodoFilter";
import {
  getTodosByFilter,
  isCompletedTodo,
  isIncompleteTodo,
} from "../helpers/todo-helpers";
import { useTodos } from "../hooks/useTodos";

export const TodoWidget = () => {
  const {
    todosState: { todos, filter },
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
    handleClearCompletedTodos,
    handleFilterChange,
    handleToggleAllTodosByFilter,
  } = useTodos({ todos: [], filter: "all" });

  const todosByFilter = getTodosByFilter(todos, filter);
  const isAllTodosByFilterCompleted = todosByFilter.every(isCompletedTodo);
  const remainingTodosCount = todos.filter(isIncompleteTodo).length;

  const isToggleAllButtonVisible = !!todosByFilter.length;
  const isTodoListVisible = !!todosByFilter.length;
  const isFooterVisible = !!todos.length;

  return (
    <div className="flex w-full max-w-[34rem] flex-col gap-3">
      <TodoForm onAddTodo={handleAddTodo}>
        {isToggleAllButtonVisible && (
          <button
            type="button"
            className={clsx(
              "px-2 py-3 text-xl focus:outline-0",
              isAllTodosByFilterCompleted ? "text-teal-600" : "text-teal-400",
            )}
            onClick={() => {
              handleToggleAllTodosByFilter(todosByFilter);
            }}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        )}
      </TodoForm>
      {isTodoListVisible && (
        <TodoList>
          {todosByFilter.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDeleteTodo={handleDeleteTodo}
                onToggleTodo={handleToggleTodo}
                onEditTodo={handleEditTodo}
              />
            );
          })}
        </TodoList>
      )}
      {isFooterVisible && (
        <TodoFooter
          remainingTodosCount={remainingTodosCount}
          filterSlot={
            <TodoFilter filter={filter} onFilterChange={handleFilterChange} />
          }
          actionButtonSlot={
            <button
              type="button"
              className="hover:underline"
              onClick={handleClearCompletedTodos}
            >
              Clear All Completed
            </button>
          }
        />
      )}
    </div>
  );
};
