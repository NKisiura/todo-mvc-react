import { Todo } from "../types/todo";
import { TodoFilter } from "../types/todo-filter";

export const getTodosByFilter = (todos: Todo[], filter: TodoFilter): Todo[] => {
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

export const isCompletedTodo = ({ isCompleted }: Todo): boolean => isCompleted;
export const isIncompleteTodo = ({ isCompleted }: Todo): boolean =>
  !isCompleted;
