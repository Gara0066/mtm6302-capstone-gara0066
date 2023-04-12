///**DEFINE VARIABLE TO DISPLAY LIST AND FUNCTIONALITY OF BUTTON */
const pokeList = document.getElementById('poke-list');
const loadMoreButton = document.getElementById('more');

//////*** Set initial values to display 20 pokemons******///////////
let offset = 0;
let limit = 20;

/////*** Uses an async function to request the PokeAPI and display the array of Pokémons***/////////
async function getPokemonCards() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
  }
  