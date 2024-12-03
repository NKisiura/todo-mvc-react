import { useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";
import {
  getTodosByFilter,
  isCompletedTodo,
  isIncompleteTodo,
} from "../helpers/todo-helpers";
import { TodoFilter } from "../types/todo-filter";
import { TodosState } from "../types/todos-state";

export const useTodos = (initialState: TodosState) => {
  const [{ filter, todos }, dispatch] = useReducer(todosReducer, initialState);

  const filteredTodos = getTodosByFilter(todos, filter);
  const isAllFilteredTodosCompleted = filteredTodos.every(isCompletedTodo);
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

  const handleToggleAllTodosByFilter = () => {
    dispatch({ type: "toggled-all-by-filter", payload: { filteredTodos } });
  };

  return {
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
  };
};
