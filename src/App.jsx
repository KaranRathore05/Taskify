import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), text: todo }])
    setTodo("")
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  }

  const handleSave = (id) => {
    setTodos(todos.map(item => item.id === id ? { ...item, text: editText } : item))
    setEditId(null);
    setEditText("")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-10 px-4 md:px-32">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">Taskify</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 p-4 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none border border-white/20 backdrop-blur-md focus:ring-2 focus:ring-cyan-400 transition duration-300"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-md transition-all backdrop-blur-sm"
            >
              Add
            </button>
          </div>

          <div className="space-y-4">
            {todos.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white/10 px-5 py-4 rounded-xl border border-white/10 hover:scale-[1.02] transition-all duration-300">
                {editId === item.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-transparent text-white p-2 outline-none border-b-2 border-cyan-400 focus:border-cyan-300 transition-all duration-300"
                  />
                ) : (
                  <span className="flex-1 text-lg font-medium text-white/90">{item.text}</span>
                )}

                <div className="flex gap-3 ml-4">
                  {editId === item.id ? (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="text-green-400 hover:text-green-300 text-xl transition"
                    >
                      ✅
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item.id, item.text)}
                      className="text-yellow-400 hover:text-yellow-300 text-xl transition"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300 text-xl transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
