import { TodoFilter } from "./todo-filter";

type Action<T extends TodoActionType, P extends Record<string, unknown>> = {
  readonly type: T;
  readonly payload: P;
};

export type TodoActionType =
  | "added"
  | "deleted"
  | "edited"
  | "toggled"
  | "cleared-completed"
  | "toggled-all-by-filter"
  | "filter-changed";

export type TodoAction =
  | Action<"added", { todo: string }>
  | Action<"deleted", { todoId: string }>
  | Action<"edited", { todoId: string; updatedTodo: string }>
  | Action<"toggled", { todoId: string }>
  | Action<"cleared-completed", {}>
  | Action<"toggled-all-by-filter", { nextStatus: boolean; todoIds: string[] }>
  | Action<"filter-changed", { filter: TodoFilter }>;
