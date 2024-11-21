import { useReducer, useState } from "react";
import todosReducer from "../reducers/todosReducer";
import TodoInput from "./todoInput";
import TodoList from "./todoList";
import TodoItem from "./todoItem";
import TodoFooter from "./todoFooter";
import { Todo } from "../types/todo";
import { TodoFilter } from "../types/todo-filter";

export function TodoWidget() {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const todosByFilter = getTodosByFilter(todos, filter);
  const itemsLeftCount = todos.filter(({ isCompleted }) => !isCompleted).length;
  const isAllTodosByFilterCompleted = todosByFilter.every(
    ({ isCompleted }) => isCompleted,
  );

  function getTodosByFilter(todos: Todo[], filter: TodoFilter) {
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
    }
  }

  function handleAddTodo(todo: string) {
    dispatch({ type: "added", payload: { todo } });
  }

  function handleDeleteTodo(todoId: string) {
    dispatch({ type: "deleted", payload: { todoId } });
  }

  function handleToggleTodo(todoId: string) {
    dispatch({ type: "toggled", payload: { todoId } });
  }

  function handleEditTodo(todoId: string, updatedTodo: string) {
    dispatch({ type: "edited", payload: { todoId, updatedTodo } });
  }

  function handleClearCompletedTodos(): void {
    dispatch({ type: "clear-completed", payload: {} });
  }

  function handleToggleAllTodosByFilter(): void {
    const nextStatus = !isAllTodosByFilterCompleted;
    const todoIds = todosByFilter.map(({ id }) => id);

    dispatch({
      type: "toggle-all-by-filter",
      payload: { nextStatus, todoIds },
    });
  }

  return (
    <div className="flex w-full max-w-[550px] flex-col gap-3">
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
          itemsLeftCount={itemsLeftCount}
          filter={filter}
          onClearCompletedTodos={handleClearCompletedTodos}
          onFilterChange={setFilter}
        />
      )}
    </div>
  );
}
