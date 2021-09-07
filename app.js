const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userApiRoutes = require('./routes/users');

const PORT = process.env.PORT || 9999;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

mongoose.connection.on('connected', function () {
  console.log('Connected to database successfully.');
});

mongoose.connection.on('error', function (err) {
  console.log('Database error:' + ' ' + err);
});

const app = express();

app.use(morgan('combined'));
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/v1/users', userApiRoutes);

app.get('/', (req, res) => {
  res.json({ success: 'true', message: 'Aggregater server!' });
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running at:`, PORT);
});
