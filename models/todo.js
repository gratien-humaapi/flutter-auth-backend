const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
    task: {
        type: String,
        require: true,
        maxlength: 30,
    },
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
      },
},
{ timestamps: true }
);

module.exports = mongoose.model('Todo', Todo);