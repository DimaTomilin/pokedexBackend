const fs = require('fs');
const express = require('express');
const router = express.Router();

//Put request to make sing in and to create user`s folder in DataBase
router.put('/create/:username', (req, res) => {
  const { username } = req.params;
  const dir = `./users/${username.toLowerCase()}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  res.send(`Sing in succeed. Hello ${username}!`);
  res.end();
});

//Post request to return username       P.S. It is so useless, i don`t know why I need it.
router.post('/info', (req, res) => {
  res.json({ username: req.headers.username });
  res.end();
});

module.exports = router;
