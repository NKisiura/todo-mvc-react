import { useReducer } from "react";
import { clsx } from "clsx";
import { todosReducer } from "../reducers/todosReducer";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import {
  getTodosByFilter,
  isCompletedTodo,
  isIncompleteTodo,
} from "../helpers/todo-helpers";
import { TodoFilter } from "../types/todo-filter";

export const TodoWidget = () => {
  const [{ todos, filter }, dispatch] = useReducer(todosReducer, {
    todos: [],
    filter: "all",
  });

  const todosByFilter = getTodosByFilter(todos, filter);
  const isAllTodosByFilterCompleted = todosByFilter.every(isCompletedTodo);
  const remainingTodosCount = todos.filter(isIncompleteTodo).length;

  const isToggleAllButtonVisible = !!todosByFilter.length;
  const isTodoListVisible = !!todosByFilter.length;
  const isFooterVisible = !!todos.length;

  const handleAddTodo = (todo: string) => {
    dispatch({ type: "added", payload: { todo } });
  };

  const handleDeleteTodo = (todoId: string) => {
    dispatch({ type: "deleted", payload: { todoId } });
  };

  const handleToggleTodo = (todoId: string) => {
    dispatch({ type: "toggled", payload: { todoId } });
  };

  const handleEditTodo = (todoId: string, updatedTodo: string) => {
    dispatch({ type: "edited", payload: { todoId, updatedTodo } });
  };

  const handleClearCompletedTodos = () => {
    dispatch({ type: "cleared-completed", payload: {} });
  };

  const handleToggleAllTodosByFilter = () => {
    const nextStatus = !isAllTodosByFilterCompleted;
    const todoIds = todosByFilter.map(({ id }) => id);

    dispatch({
      type: "toggled-all-by-filter",
      payload: { nextStatus, todoIds },
    });
  };

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch({ type: "filter-changed", payload: { filter } });
  };

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
            onClick={handleToggleAllTodosByFilter}
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
          filter={filter}
          onClearCompletedTodos={handleClearCompletedTodos}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};
