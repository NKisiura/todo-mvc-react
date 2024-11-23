import { TodoFilter } from "./todo-filter";
import { Todo } from "./todo";

export type TodosState = {
  readonly filter: TodoFilter;
  readonly todos: Todo[];
};
