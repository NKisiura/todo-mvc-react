import { TodoAction } from "../types/todo-action";
import { TodosState } from "../types/todos-state";
import { Todo } from "../types/todo";
import { isCompletedTodo } from "../helpers/todo-helpers";

export const todosReducer = (
  state: TodosState,
  { type, payload }: TodoAction,
): TodosState => {
  switch (type) {
    case "added": {
      const { todo } = payload;

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        isCompleted: false,
        todo,
      };

      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case "deleted": {
      const { todoId } = payload;

      const todos = state.todos.filter(({ id }) => id !== todoId);

      return { ...state, todos };
    }
    case "edited": {
      const { todoId, updatedTodo } = payload;

      const todos = state.todos.map((todo) => {
        const isTargetTodo = todo.id === todoId;

        return isTargetTodo ? { ...todo, todo: updatedTodo } : todo;
      });

      return { ...state, todos };
    }
    case "toggled": {
      const { todoId } = payload;

      const todos = state.todos.map((todo) => {
        const { id, isCompleted } = todo;
        const isTargetTodo = id === todoId;

        return isTargetTodo ? { ...todo, isCompleted: !isCompleted } : todo;
      });

      return { ...state, todos };
    }
    case "cleared-completed": {
      const todos = state.todos.filter(({ isCompleted }) => !isCompleted);

      return { ...state, todos };
    }
    case "toggled-all-by-filter": {
      const { filteredTodos } = payload;

      const isAllFilteredTodosCompleted = filteredTodos.every(isCompletedTodo);
      const nextStatus = !isAllFilteredTodosCompleted;

      const todos = state.todos.map((todo): Todo => {
        const isTargetTodo = filteredTodos.some(({ id }) => id === todo.id);

        return isTargetTodo ? { ...todo, isCompleted: nextStatus } : todo;
      });

      return { ...state, todos };
    }
    case "filter-changed": {
      const { filter } = payload;

      return { ...state, filter };
    }
    default: {
      throw new Error(`todosReducer: unknown action "${type}"`);
    }
  }
};
