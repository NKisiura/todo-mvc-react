import { TodoWidget } from "./components/todoWidget";

function App() {
  return (
    <div className="min-h-screen bg-teal-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          <header className="text-7xl font-extralight text-teal-600">
            todos
          </header>
          <TodoWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
