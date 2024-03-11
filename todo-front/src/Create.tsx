import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

export default function Create() {
    const [task, setTask] = useState<string>("");

    const handleAdd = () =>{
        axios.post("http://localhost:3005/add", {task: task})
        .then(result => console.log(result))
        .catch(err => console.log(err.message))
    }
  return (
    <div>
        <input type="text" name="task" id="task" onChange={(e) => setTask(e.target.value)} />
        <button type='submit' onClick={handleAdd}>Add</button>
    </div>
  )
}
