///**DEFINE VARIABLE TO DISPLAY LIST AND FUNCTIONALITY OF BUTTON */

const pokeList = document.getElementById('poke-list');
const loadMoreButton = document.getElementById('more');
//**cONST FOR SEARCH BAR */
const searchInput = document.getElementById('search-bar');
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

////////*********Create a for Loop through each Pokémon card to get the name and type***********////////////////
  for (let i = 0; i < pokemonCards.length; i++) {
    const pokemon = pokemonCards[i];
    const typesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const typesData = await typesResponse.json();
    pokemon.types = typesData.types.map(type => type.type.name);
  }

  return pokemonCards;
}

async function renderPokemonCards(searchTerm) {
    const pokemonCards = await getPokemonCards();
    const filteredPokemonCards = pokemonCards.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    pokeList.innerHTML = '';
    filteredPokemonCards.forEach(pokemon => {
      const card = document.createElement('a');
      card.href = `info.html?name=${pokemon.name}`;
      card.classList.add('card');
      card.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('pokeID', pokemon.name);
        window.location.href = event.currentTarget.href;
      });
      card.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>${pokemon.types.join(' / ')}</p>
      `;
      pokeList.appendChild(card);
    });
  }

////********Function to use load more button****/////
loadMoreButton.addEventListener('click', () => {
  offset += limit;
  renderPokemonCards(searchInput.value);
});

////********Function to use search bar to search by name****/////
searchInput.addEventListener('input', () => {
  renderPokemonCards(searchInput.value);
});
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
///**FAVOURITE SECTION/ ADDS THE SELECTE POKEMON / FUNCTION TO DELETE IT FROM LIST */

renderPokemonCards('');
const favoritePokemon = JSON.parse(localStorage.getItem('favoritePokemon'));

if (favoritePokemon){
  
  // Select the favorites section and its associated ul element
  const favoritesSection = document.querySelector('.favorites');
  const favoritesList = favoritesSection.querySelector('ul');

  // Use Promise.all() to wait for all API requests to complete
  Promise.all(favoritePokemon.map(async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
    const data = await response.json();
    return { ...pokemon, image: data.sprites.front_default };
  })).then((favoritesWithImages) => {
    // Update the favorites list with the name, image, and delete button of each favorite Pokemon
    favoritesList.innerHTML = favoritesWithImages.map((pokemon) => {
      return `<li><img src="${pokemon.image}"><button class="delete-btn" data-id="${pokemon.id}">&#x2715;</button></li>`;
    }).join('');

    // Add click event listener to delete button
    const deleteButtons = favoritesList.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const pokemonId = event.target.dataset.id;
        const updatedFavorites = favoritePokemon.filter((pokemon) => pokemon.id !== pokemonId);
        localStorage.setItem('favoritePokemon', JSON.stringify(updatedFavorites));
        event.target.parentNode.remove(); // Remove the pokemon list item from the favorites list
      });
    });
  });
}

  

  

