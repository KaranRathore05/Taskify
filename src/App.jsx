import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    ls()
  }, [])

  const ls = () => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    if (todo.trim() === "") return
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white py-10 px-4 md:px-32">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide">Taskify</h1>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              value={todo}
              onChange={handleChange}
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
            {todos.filter(todo => showFinished || !todo.isCompleted).map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white/10 px-5 py-4 rounded-xl border border-white/10 hover:scale-[1.02] transition-all duration-300">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mr-4 w-5 h-5 accent-cyan-400"
                />
                <span className={`flex-1 text-lg font-medium ${item.isCompleted ? 'line-through text-white/50' : 'text-white/90'}`}>
                  {item.todo}
                </span>
                <div className="flex gap-3 ml-4">
                  <button onClick={(e) => handleEdit(e, item.id)} className="text-yellow-400 hover:text-yellow-300 text-xl transition">
                    <FaEdit />
                  </button>
                  <button onClick={(e) => handleDelete(e, item.id)} className="text-red-400 hover:text-red-300 text-xl transition">
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <label className="flex items-center space-x-2 text-white/80">
              <input type="checkbox" checked={showFinished} onChange={toggleFinished} className="w-4 h-4 accent-cyan-400" />
              <span>Show Completed</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
