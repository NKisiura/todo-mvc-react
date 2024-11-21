import { Todo } from "../types/todo";
import { TodoAction } from "../types/todo-action";

export default function todosReducer(
  todos: Todo[],
  { type, payload }: TodoAction,
) {
  switch (type) {
    case "added": {
      const { todo } = payload;

      return [
        ...todos,
        {
          id: crypto.randomUUID(),
          isCompleted: false,
          todo,
        },
      ];
    }
    case "deleted": {
      const { todoId } = payload;

      return todos.filter(({ id }) => id !== todoId);
    }
    case "edited": {
      const { todoId, updatedTodo } = payload;

      return todos.map((todo) => {
        const isTargetTodo = todo.id === todoId;

        return isTargetTodo ? { ...todo, todo: updatedTodo } : todo;
      });
    }
    case "toggled": {
      const { todoId } = payload;

      return todos.map((todo) => {
        const { id, isCompleted } = todo;
        const isTargetTodo = id === todoId;

        return isTargetTodo ? { ...todo, isCompleted: !isCompleted } : todo;
      });
    }
    case "clear-completed": {
      return todos.filter(({ isCompleted }) => !isCompleted);
    }
    case "toggle-all-by-filter": {
      const { nextStatus, todoIds } = payload;

      return todos.map((todo) => {
        const isTargetTodo = todoIds.includes(todo.id);

        return isTargetTodo ? { ...todo, isCompleted: nextStatus } : todo;
      });
    }
    default: {
      return todos;
    }
  }
}
