import { clsx } from "clsx";
import { useTodos } from "../hooks/useTodos";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TodoFilter } from "./TodoFilter";

export const TodoWidget = () => {
  const {
    todos,
    filter,
    filteredTodos,
    isAllFilteredTodosCompleted,
    remainingTodosCount,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
    handleClearCompletedTodos,
    handleFilterChange,
    handleToggleAllTodosByFilter,
  } = useTodos({ todos: [], filter: "all" });

  const isToggleAllButtonVisible = !!filteredTodos.length;
  const isTodoListVisible = !!filteredTodos.length;
  const isFooterVisible = !!todos.length;

  return (
    <div className="flex w-full max-w-[34rem] flex-col gap-3">
      <TodoForm onAddTodo={handleAddTodo}>
        {isToggleAllButtonVisible && (
          <button
            type="button"
            className={clsx(
              "px-2 py-3 text-xl focus:outline-0",
              isAllFilteredTodosCompleted ? "text-teal-600" : "text-teal-400",
            )}
            onClick={handleToggleAllTodosByFilter}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        )}
      </TodoForm>
      {isTodoListVisible && (
        <TodoList>
          {filteredTodos.map((todo) => {
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
          content={
            <>
              <TodoFilter filter={filter} onFilterChange={handleFilterChange} />
              <button
                type="button"
                className="hover:underline"
                onClick={handleClearCompletedTodos}
              >
                Clear All Completed
              </button>
            </>
          }
        />
      )}
    </div>
  );
};
