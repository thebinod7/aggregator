const express = require('express');
const config = require('config');

const PORT = config.get('app.port') || 8888;

const app = express();

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running at:`, PORT);
});
