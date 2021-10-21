const fs = require('fs');
const path = require('path');

//Making array from objects of types
function getPokemonTypes(types) {
  const newArr = types.map((element) => element.type.name);
  return newArr;
}

//Making array from objects of abilities
function getPokemonAbilities(abilities) {
  const newArr = abilities.map((element) => element.ability.name);
  return newArr;
}

//Creating object of pokemon
function generationPokemonObject(object) {
  const pokemonTypes = getPokemonTypes(object.types);
  const pokemonAbilities = getPokemonAbilities(object.abilities);
  const pokemon = {
    id: object.id,
    name: object.name,
    height: object.height,
    weight: object.weight,
    types: pokemonTypes,
    front_pic: object.sprites['front_default'],
    back_pic: object.sprites['back_default'],
    abilities: pokemonAbilities,
  };
  return pokemon;
}

//Adding file to DataBase
function createPokemonFile(pokemon, pokemonID, username) {
  fs.writeFileSync(
    path.join('./users', username, `${pokemonID}.json`),
    JSON.stringify(pokemon)
  );
}

//Deleting file from DataBase
function deletePokemonFile(pokemonID, username) {
  fs.rmSync(path.join('./users', username, `${pokemonID}.json`));
}

//Generation list of all pokemons of user
function listYoursPokemons(username) {
  const allUsernamePokemons = [];
  const filenames = fs.readdirSync(`./users/${username}`);
  filenames.forEach((filename) => {
    const pokemon = JSON.parse(
      fs.readFileSync(`./users/${username}/${filename}`)
    ).name;
    allUsernamePokemons.push(pokemon);
  });
  return allUsernamePokemons;
}

module.exports = {
  generationPokemonObject,
  createPokemonFile,
  deletePokemonFile,
  listYoursPokemons,
};
