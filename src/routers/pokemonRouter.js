const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const isUsername = require('../middleware/userHandler');
const errorHandler = require('../middleware/errorHandler');
const derectives = require('../derectives');

//  Check if request have header {username : <string>}
router.use(isUsername);

// Get request by name in query params
router.get('/query', (req, res) => {
  const name = req.query.name;
  P.getPokemonByName(name)
    .then((result) => {
      const pokemon = derectives.generationPokemonObject(result);
      res.send(pokemon);
      res.end();
    })
    .catch((err) => {
      res.status(404).json({ Error: `${err.message}. Pokemon not found.` });
      res.end();
    });
});

// Get request by id url params
router.get('/get/:id', (req, res) => {
  const id = req.params;
  P.getPokemonByName(id)
    .then((result) => {
      const pokemon = derectives.generationPokemonObject(result);
      res.send(pokemon);
      res.end();
    })
    .catch((err) => {
      res.status(404).json({ Error: `${err.message}. Pokemon not found.` });
      res.end();
    });
});

//Get request that show all pokemons from DataBase of the user
router.get('/', (req, res) => {
  try {
    const username = req.headers.username;
    const allUsernamePokemons = derectives.listYoursPokemons(username);
    res.send(allUsernamePokemons);
    res.end();
  } catch {
    throw Error;
  }
});

//Put request of catching pokemon and creating file in DataBase
router.put('/catch/:id', errorHandler.isPokemonCatched, (req, res) => {
  const id = req.params;
  P.getPokemonByName(id)
    .then((result) => {
      const pokemon = derectives.generationPokemonObject(result);
      derectives.createPokemonFile(pokemon, id, req.headers.username);
      res.send('catch');
      res.end();
    })
    .catch((err) => {
      res.status(404).json({ Error: `${err.message}. Pokemon not found.` });
      res.end();
    });
});

//Delete request of deleting caught pokemon and deleting file from DataBase
router.delete('/release/:id', errorHandler.isPokemonCatched, (req, res) => {
  try {
    const id = req.params;
    derectives.deletePokemonFile(id, req.headers.username);
    res.send('succed');
    res.end();
  } catch {
    throw Error;
  }
});

router.get('/type/:typename', (req, res) => {
  const typename = req.params;
  P.getTypeByName(typename)
    .then((result) => {
      res.send(result);
      res.end();
    })
    .catch((error) => {
      res.send(error);
      res.end();
      console.log('There was an ERROR: ', error);
    });
});

module.exports = router;
