import { ReactNode, useState } from "react";

interface InputProps {
  readonly children: ReactNode;
  readonly onAddTodo: (todo: string) => void;
}

export const TodoInput = ({ children, onAddTodo }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative">
      <div className="absolute flex h-full w-10 items-center justify-center">
        {children}
      </div>
      <input
        type="text"
        className="w-full rounded-xl border-2 border-white p-3 pl-10 text-2xl font-extralight text-teal-900 shadow-md transition-colors placeholder:italic placeholder:text-teal-500 focus:border-teal-400 focus:outline-0"
        placeholder="What needs to be done?"
        autoFocus
        value={inputValue}
        onInput={(event) => {
          setInputValue((event.target as HTMLInputElement).value);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          if (!inputValue.trim()) return;

          onAddTodo(inputValue.trim());
          setInputValue("");
        }}
      />
    </div>
  );
};
