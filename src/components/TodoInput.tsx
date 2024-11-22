import { ChangeEvent, ReactNode, useState, KeyboardEvent } from "react";

type InputProps = {
  readonly children: ReactNode;
  readonly onAddTodo: (todo: string) => void;
};

export const TodoInput = ({ children, onAddTodo }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (!inputValue.trim()) return;

    onAddTodo(inputValue.trim());
    setInputValue("");
  };

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
        onChange={handleChangeEvent}
        onKeyDown={handleKeyDownEvent}
      />
    </div>
  );
};
