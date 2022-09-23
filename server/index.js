const express = require('express');
const app = express();
const port = 3001;

app.get('/api/users', (req, res) => {
  res.send(
      require('./data.json')
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
