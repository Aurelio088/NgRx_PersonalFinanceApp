const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

// Middleware
app.use(bodyParser.json());

// NongoDB Connection
mongoose.connect('mongodb://localhost:27017/personal_finance')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Connection error:', error));

// Routes
const transactionsRouter = require('./routes/transactions');
app.use('/api/transactions', transactionsRouter);

// Home route --> to be updated later
app.get('/', (req, res) => {
  res.send('You are on the homepage!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
