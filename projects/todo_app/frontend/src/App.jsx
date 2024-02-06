import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todo'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])

  // bad practice as it will keep sending the requests again and again
  fetch("http://localhost:3000/todos").then(async function(res){
    const json=await res.json();
    setTodos(json.todos)
  })
  return (
    <div>
      <CreateTodo setTodos={setTodos}/>
      <Todos todos={todos}/>
    </div>
  )
}

export default App
