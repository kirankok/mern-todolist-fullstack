import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); // [{ id, title }]
  const [loading, setLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/todos');
      setTasks(response.data); // assume API returns array of { id, title }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      alert('Failed to load tasks.');
    } finally {
      setLoadingTasks(false);
    }
  };

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!task.trim()) return;

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4001/api/todos', {
        title: task,
        completed: false, // default value
      });
      const savedTask = response.data;
      setTasks([...tasks, savedTask]);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error.message);
      alert('Failed to add task. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/todos/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task.');
    }
  };

  if (loadingTasks) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" align="center">
          Loading tasks...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          To-Do List
        </Typography>
        <TextField
          fullWidth
          label="New Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </Button>
        <List sx={{ mt: 2 }}>
          {tasks.map(({ _id, title }) => (
            <ListItem
              key={_id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(_id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default App;
