import { useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function App() {
  const [todos, setTodos] = useState([]);

  const onFormAction = async (formData) => {
    const todo = formData.get("todo");

    setTodos([
      {
        id: Date.now(),
        text: todo,
      },
      ...todos,
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center pt-40 gap-8">
          <form action={onFormAction} className="flex justify-center gap-5 ">
            <input
              name="todo"
              className="w-24 md:w-48 lg:w-84 sm:w-32 xl:w-100 rounded-md ring-4 ring-amber-300 bg-stone-300 font-bold p-2 text-amber-900"
            />
            <button
              type="submit"
              className="rounded-md ring-4 ring-amber-300 p-3 bg-zinc-600 hover:bg-black text-stone-400 uppercase font-bold"
            >
              Ajouter
            </button>
          </form>
          <ul className="flex flex-col gap-4 font-mono w-full max-w-lg">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-zinc-200 px-4 py-2 rounded flex items-center w-full"
              >
                <span className="flex-1 text-2xl underline">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-600 px-2 py-2 rounded-lg text-white hover:bg-red-800"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
