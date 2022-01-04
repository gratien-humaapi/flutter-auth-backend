const express = require('express');
const router = require('express').Router();


const todoActions = require('../methods/todo');

// get all todos
router.get('/', todoActions.getTodos);

// to get all the todos by userId
router.get('/:userId', todoActions.getAllTodos);

// to get a single todo
router.get('/todo/:id', todoActions.getTodo);

// to create a todo
router.post('/', todoActions.createTodo);

// to update the todo
router.put('/todo/:id', todoActions.updateTodo);

// to delete the todo
router.delete('/todo/:id', todoActions.deleteTodo);

module.exports = router;
