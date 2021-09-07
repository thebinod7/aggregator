const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const userApiRoutes = require('./routes/users');

const PORT = config.get('app.port') || 9999;
const ALLOWED_ORIGIN = config.get('app.allowed_origin');

mongoose.connect(config.get('app.db_url'));

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
