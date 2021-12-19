const Todo = require('../models/todo');
const User = require('../models/user');

const fuctions = {
    // get a single todo
    getTodo: async (req, res) => {
        try {
          const task = await Todo.findById(req.params.taskId)
            res.json(task);
          } catch (err) {
              res.json({message: err});
          }
    },
    // get all todos
    getTodos: async (req, res) => {
        try {
            const tasks = await Todo.find({});
            res.json(tasks);
        } catch (err){
            res.json({message: err});
        }
    },
    // get all todos by userId
    getAllTodos: async (req, res) => {
        try {
            const id = req.params.id
            const tasks = await Todo.find({userId:id});
            res.json(tasks);
        } catch (err){
            res.json({message: err});
        }
    },
    // create a todo
    createTodo: async (req, res) => {
        try {
            const task = req.body;
            const newTask = await Todo.create(task);
            res.json(newTask);
        } catch (err) {
            res.json({message: err});
        }
    },
    // update a todo
  updateTodo: async (req, res) => {
    try {
      const taskId = req.params.id;
      const updates = req.body;
      const taskToUpdate = await Todo.findByIdAndUpdate(taskId, updates);
      res.json(taskToUpdate);
    } catch (err){
        res.json({message: err});
    }

},

// delete a todo
deleteTodo: async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = await Todo.findById(taskId);
        await Todo.findByIdAndDelete(taskId);
        res.json({ data: taskToDelete });
    } catch (err) {
        res.json({message: err});
    }
},
}

module.exports = fuctions;