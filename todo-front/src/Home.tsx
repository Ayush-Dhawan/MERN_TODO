import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import './App.css'

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  const [task, setTask] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);


  useEffect(() => {
    axios.get("http://localhost:3005/get")
    .then(result => setTodos(result.data))
    .catch(err => console.log(err.message))
  }, [todos])

  const handleUpdate = (taskId: any) =>{
    axios.put(`http://localhost:3005/update/${taskId}`)
    .then(result => console.log(result))
    .catch(err => console.log(err.message))
}

const handleDelete = (taskId: any) =>{
  axios.delete(`http://localhost:3005/delete/${taskId}`)
  .then(result => setTodos(result.data))
  .catch(err => console.log(err.message))
}



  return (
    <div className='home-container'>
      <h2>TODO LIST</h2>
      <Create />
      <center>
      <ul>
        {!todos.length ? "No tasks for today!" : todos.map((item: { task: string, _id: any, completed: boolean}) => {
          return <li key={item._id} > <span style={{cursor: 'pointer'}} onClick={() => {handleUpdate(item._id); setCompleted(!completed)}}>✅</span>
          <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }} >{item.task}</span>
          <span style={{cursor: 'pointer'}} onClick={() => handleDelete(item._id)}>❌</span></li>
        })}
      </ul>
      </center>
    </div>
  )
}
