const express = require('express');
const app = express();
const port = 8080;

// start the server
app.listen(port, function() {
    console.log('app started');
  });

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});