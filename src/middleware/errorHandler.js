const fs = require('fs');
const path = require('path');

//Middleware of catch/delete pokemon from DataBase that check method of request
function isPokemonCatched(req, res, next) {
  const { id } = req.params;
  const username = req.headers.username;
  const method = req.method;
  //If PUT request check if pokemon already caught
  if (method === 'PUT') {
    if (fs.existsSync(path.join('./users', username, `${id}.json`))) {
      return res.status(403).json({ Error: 'Pokemon already caught.' });
    }
  }
  //If DELETE request check if pokemon still caught
  if (method === 'DELETE') {
    if (!fs.existsSync(path.join('./users', username, `${id}.json`))) {
      return res.status(403).json({ Error: "Pokemon haven't been caught" });
    }
  }
  next();
}

//Middleware of server to all server erros
function serverError(err, req, res, next) {
  res.status(500);
  res.send('Oops, something went wrong.');
  res.end();
}

module.exports = {
  isPokemonCatched,
  serverError,
};
