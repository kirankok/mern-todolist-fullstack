const todoController = require('../controllers/todoController');
const express = require('express');

const router = express.Router();

// Define routes for todos
router.get('/todos', todoController.getAllTodos);
router.post('/todos', todoController.addTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;