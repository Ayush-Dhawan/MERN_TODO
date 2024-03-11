const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./db/todoModel")
require("./db/dbConnect")


const app = express();
app.use(cors());
app.use(express.json());

app.listen(3005, () => console.log("server is up at 3005"))


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task,
    }).then(result => res.json(result)).catch(err => res.json(err.message))
})

app.get('/get', async (req, res) => {
    try {
        const result = await TodoModel.find();
        res.json(result);
    } catch (err) {
        console.log(err.message);
    }
});

app.put('/update/:id', (req, res) => {
    const taskId = req.params.id;
    // const done = re.params.completed;
    
    TodoModel.findByIdAndUpdate(
        {_id: taskId},
        {completed: true}, // Corrected to toggle the boolean value
    )
    .then(result => res.json(result))
    .catch(err => res.json(err.message));
});

app.delete('/delete/:id', (req, res) => {
    const taskId = req.params.id;

    TodoModel.findByIdAndDelete({_id: taskId})
        .then(result => {
            if (result) {
                res.json({ message: 'Task deleted successfully.' });
            } else {
                res.status(404).json({ error: 'Task not found.' });
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

