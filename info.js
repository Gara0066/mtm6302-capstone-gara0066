//////////////********FOR THE INFO PAGE********////////////////
////**DEFINES VARIABLE USING LOCAL STORAGE */
const pokeID = `${localStorage.getItem('pokeID')}`;

// Replaces each pokemon DATA//
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

///*****Function to click button***** */
const pokeballButton = document.querySelector('.pokeball');

pokeballButton.addEventListener('click', () => {
  pokeballButton.classList.toggle('clicked');
});

