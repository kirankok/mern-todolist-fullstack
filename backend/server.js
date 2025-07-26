const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

//Execute express 
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use('/api', todoRoutes);

mongoose.connect('mongodb://localhost:27017/todolistsDb')
  .then(() => console.log('Connected to the database…'))
  .catch((err) => console.error('Connection error:', err));

const port = 4001;


app.listen(port, () => console.log(`Server is running on port ${port}`)); 