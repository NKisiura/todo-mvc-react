import { ChangeEvent, ReactNode, useState, FormEvent } from "react";

type FormProps = {
  readonly children: ReactNode;
  readonly onAddTodo: (todo: string) => void;
};

export const TodoForm = ({ children, onAddTodo }: FormProps) => {
  const [todo, setTodo] = useState("");

  const handleTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo.trim()) return;

    onAddTodo(todo.trim());
    setTodo("");
  };

  return (
    <form className="relative" onSubmit={handleFormSubmit}>
      <div className="absolute flex h-full w-10 items-center justify-center">
        {children}
      </div>
      <input
        type="text"
        className="w-full rounded-xl border-2 border-white p-3 pl-10 text-2xl font-extralight text-teal-900 shadow-md transition-colors placeholder:italic placeholder:text-teal-500 focus:border-teal-400 focus:outline-0"
        placeholder="What needs to be done?"
        autoFocus
        value={todo}
        onChange={handleTodoChange}
      />
    </form>
  );
};
