import { useReducer, useState } from "react";
import { todosReducer } from "../reducers/todosReducer";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { Todo } from "../types/todo";
import { TodoFilter } from "../types/todo-filter";

export const TodoWidget = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const getTodosByFilter = (todos: Todo[], filter: TodoFilter) => {
    switch (filter) {
      case "all": {
        return todos;
      }
      case "active": {
        return todos.filter(({ isCompleted }) => !isCompleted);
      }
      case "completed": {
        return todos.filter(({ isCompleted }) => isCompleted);
      }
      default: {
        throw new Error("Unknown filter value");
      }
    }
  };

  const todosByFilter = getTodosByFilter(todos, filter);
  const remainingItemsCount = todos.filter(
    ({ isCompleted }) => !isCompleted,
  ).length;
  const isAllTodosByFilterCompleted = todosByFilter.every(
    ({ isCompleted }) => isCompleted,
  );

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

  return (
    <div className="flex w-full max-w-[34rem] flex-col gap-3">
      <TodoInput onAddTodo={handleAddTodo}>
        {!!todosByFilter.length && (
          <button
            type="button"
            className={`px-2 py-3 text-xl text-teal-400 focus:outline-0 ${isAllTodosByFilterCompleted ? "!text-teal-600" : ""}`}
            onClick={handleToggleAllTodosByFilter}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        )}
      </TodoInput>
      {!!todosByFilter.length && (
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
      {!!todos.length && (
        <TodoFooter
          remainingItemsCount={remainingItemsCount}
          filter={filter}
          onClearCompletedTodos={handleClearCompletedTodos}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
};
