const express = require('express');
const app = express();
const pokemonRouter = require('./src/routers/pokemonRouter');
const userRouter = require('./src/routers/userRouter');
const errorHandler = require('./src/middleware/errorHandler');

const port = 8080;

app.listen(port, function () {
  console.log('app started');
});

app.use('/pokemon', pokemonRouter);
app.use('/users', userRouter);
app.use(errorHandler.serverError);
