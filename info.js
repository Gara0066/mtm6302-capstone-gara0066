// //////////////********FOR THE INFO PAGE********////////////////


// Populate the HTML elements with the data
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('pokeID')}`;
fetch(apiUrl)
  .then(response => response.json())
  .then(data => populateElements(data))
  .catch(error => console.log(error));

function populateElements(data) {
  // Get the HTML elements to populate
  const posterImage = document.getElementById("bigger-icon");
  const title = document.querySelector(".h1-info");
  const aboutParagraph = document.querySelector(".about p");
  const heightSpan = document.querySelector(".about .aboutInfo:nth-of-type(1)");
  const weightSpan = document.querySelector(".about .aboutInfo:nth-of-type(2)");
  const categorySpan = document.querySelector(".about .aboutInfo:nth-of-type(3)");
  const typeText = document.querySelector(".typeText");
  const hpProgress = document.querySelector(".progress-blue");
  const atkProgress = document.querySelector(".progress-purple");
  const dfsProgress = document.querySelector(".progress-green");
  const satkProgress = document.querySelector(".progress-yellow");
  const sdfsProgress = document.querySelector(".progress-pink");
  const spdProgress = document.querySelector(".progress-orange");

  // Populate the HTML elements with the data
  posterImage.src = data.sprites.other["official-artwork"].front_default;
  title.textContent = data.name;
  aboutParagraph.textContent = data.species.name;
  heightSpan.textContent = `Height: ${data.height / 10} m`;
  weightSpan.textContent = `Weight: ${data.weight / 10} kg`;
  typeText.textContent = data.types.map(t => t.type.name).join(", ");
  hpProgress.style.width = `${data.stats[0].base_stat}%`;
  atkProgress.style.width = `${data.stats[1].base_stat}%`;
  dfsProgress.style.width = `${data.stats[2].base_stat}%`;
  satkProgress.style.width = `${data.stats[3].base_stat}%`;
  sdfsProgress.style.width = `${data.stats[4].base_stat}%`;
  spdProgress.style.width = `${data.stats[5].base_stat}%`;
}



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//**DEFINES VARIABLE FOR BUTTON/FAVOURITE/DATA */
const pokeballButton = document.querySelector('.pokeball');
const favoritePokemon = JSON.parse(localStorage.getItem('favoritePokemon')) || [];
const pokeID = `${localStorage.getItem('pokeID')}`;

// Add an event listener to the pokeballButton element
pokeballButton.addEventListener('click', () => {
  //'clicked' class on the pokeballButton element
  pokeballButton.classList.toggle('clicked');
  
  // Check if the current pokemon is already in favorites
  if (!favoritePokemon.find(pokemon => pokemon.id === pokeID)) {
    // Add the current pokemon to favorites array
    favoritePokemon.push({
      id: pokeID, // add the id of the current pokemon to the favorites object
      name: document.querySelector('.h1-info').textContent, // add the name of the current pokemon to the favorites object
      image: document.getElementById('bigger-icon').src // add the image URL of the current pokemon to the favorites object
    });
    // Store the updated favorites array in the browser's local storage
    localStorage.setItem('favoritePokemon', JSON.stringify(favoritePokemon));
  }
  
  // Select the favorites section and its associated ul element
  const favoritesSection = document.querySelector('.favorites');
  const favoritesList = favoritesSection.querySelector('ul');

  // Get the list of favorite pokemon from localStorage and populate the favorites list
  favoritesList.innerHTML = favoritePokemon.map(pokemon => `<li>${pokemon.name}</li>`).join('');
});  