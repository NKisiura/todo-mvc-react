import { useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";
import {
  getTodosByFilter,
  isCompletedTodo,
  isIncompleteTodo,
} from "../helpers/todo-helpers";
import { Todo } from "../types/todo";
import { TodoFilter } from "../types/todo-filter";
import { TodosState } from "../types/todos-state";

export const useTodos = (initialState: TodosState) => {
  const [{ filter, todos }, dispatch] = useReducer(todosReducer, initialState);

  const filteredTodos = getTodosByFilter(todos, filter);
  const isAllTodosByFilterCompleted = filteredTodos.every(isCompletedTodo);
  const remainingTodosCount = todos.filter(isIncompleteTodo).length;

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

  const handleFilterChange = (filter: TodoFilter) => {
    dispatch({ type: "filter-changed", payload: { filter } });
  };

  const handleToggleAllTodosByFilter = (todosByFilter: Todo[]) => {
    const todoIds = todosByFilter.map(({ id }) => id);
    const isAllTodosByFilterCompleted = todosByFilter.every(isCompletedTodo);
    const nextStatus = !isAllTodosByFilterCompleted;

    dispatch({
      type: "toggled-all-by-filter",
      payload: { nextStatus, todoIds },
    });
  };

  return {
    todos,
    filter,
    filteredTodos,
    isAllTodosByFilterCompleted,
    remainingTodosCount,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleEditTodo,
    handleClearCompletedTodos,
    handleFilterChange,
    handleToggleAllTodosByFilter,
  };
};
