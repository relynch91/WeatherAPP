const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables

// app.use(express.static('public'))
app.use(express.static(__dirname));

// app.get('/', (request, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// });

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
});
