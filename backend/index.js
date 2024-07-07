const express = require('express');
const cors = require('cors');
const { Todo } = require('./models');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { text, category, dataEvento } = req.body;
  const newTodo = await Todo.create({ text, category, dataEvento });
  res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  const todo = await Todo.findByPk(id);
  todo.isCompleted = isCompleted;
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.json({ message: 'Todo deleted' });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
