type Action<T extends TodoActionType, P extends Record<string, unknown>> = {
  readonly type: T;
  readonly payload: P;
};

export type TodoActionType =
  | "added"
  | "deleted"
  | "edited"
  | "toggled"
  | "clear-completed"
  | "toggle-all-by-filter";

export type TodoAction =
  | Action<"added", { todo: string }>
  | Action<"deleted", { todoId: string }>
  | Action<"edited", { todoId: string; updatedTodo: string }>
  | Action<"toggled", { todoId: string }>
  | Action<"clear-completed", {}>
  | Action<"toggle-all-by-filter", { nextStatus: boolean; todoIds: string[] }>;
