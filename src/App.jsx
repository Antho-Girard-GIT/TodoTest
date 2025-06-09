import { useState, useEffect } from "react";
import { supabase } from "../supabase"
import { FaTrash } from "react-icons/fa6";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data || []);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from('todolist')
      .insert([{ todoitem: newTodo.trim() }])
      .select();

    if (error) {
      console.error('Error adding todo:', error);
    } else {
      setTodos([data[0], ...todos]);
      setNewTodo("");
    }
  }

  async function deleteTodo(id) {
    const { error } = await supabase
      .from('todolist')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting todo:', error);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  }

  return (
    <div className="h-screen bg-[#0d57a1] pt-25 p-10 md:p-25">
      <div className="flex items-center justify-center bg-zinc-200 p-10 top-25 rounded-4xl shadow-2xl/50 shadow-[#000]">
        <div className="flex flex-col items-center gap-8">
          <form onSubmit={handleSubmit} className="flex justify-center gap-5">
            <input
              name="todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="w-50 lg:w-84 xl:w-100 rounded-md ring-4 ring-[#000] bg-blue-300 font-bold p-2 text-amber-900"
            />
            <button
              type="submit"
              className="rounded-md ring-4 ring-[#000] p-3 bg-[#0F375E] hover:bg-blue-200 hover:text-black text-[#fff] uppercase font-bold transition duration-700 hover:rotate-360"
            >
              Ajouter
            </button>  
          </form>
          <ul className="flex flex-col gap-4 font-mono w-full max-w-lg">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="bg-zinc-200 px-4 py-2 rounded-xl shadow-xl border flex items-center w-full"
              >
                <span className="flex-1 text-lg">{todo.todoitem}</span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-600 px-2 py-2 rounded-lg text-white hover:bg-red-700 hover:scale-110"
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
