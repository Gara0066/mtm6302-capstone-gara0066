///**DEFINE VARIABLE TO DISPLAY LIST AND FUNCTIONALITY OF BUTTON */
const pokeList = document.getElementById('poke-list');
const loadMoreButton = document.getElementById('more');

//////*** Set initial values to display 20 pokemons******///////////
let offset = 0;
let limit = 20;

/////*** Uses an async function to request the PokeAPI and display Pokémons***/////////
async function getPokemonCards() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const pokemonData = data.results;
    const pokemonCards = pokemonData.map(pokemon => ({
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
      types: [],
    }));

/////////*********Create a for Loop through each Pokémon card to get the name and type***********////////////////
  for (let i = 0; i < pokemonCards.length; i++) {
    const pokemon = pokemonCards[i];
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const typesData = await typesResponse.json();
    pokemon.types = typesData.types.map(type => type.type.name);
  }
  return pokemonCards;
}

