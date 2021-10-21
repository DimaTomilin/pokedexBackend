const fs = require('fs');

//Check if request headers have username key and if DataBase have user`s folder
function isUsername(req, res, next) {
  const username = req.headers.username;
  if (!username) {
    return res.status(401).json({ error: 'Missing username!' });
  } else if (!fs.existsSync(`./users/${username.toLowerCase()}`)) {
    return res
      .status(401)
      .json({ error: 'Unknown username. Please make sing in.' });
  }
  next();
}

module.exports = isUsername;
