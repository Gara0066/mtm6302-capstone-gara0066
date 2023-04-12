//////////////********FOR THE INFO PAGE********////////////////

// Replaces each pokemon name //
const apiUrl = `https://pokeapi.co/api/v2/pokemon/{pokemonName}`;

// Selects the classes to add the info
const posterImage = document.getElementById("bigger-icon");
const posterTitle = document.querySelector(".h1-info");
const aboutInfo = document.querySelectorAll(".aboutInfo");
const typeText = document.querySelector(".typeText");
const hpBar = document.querySelector(".progress-blue");
const atkBar = document.querySelector(".progress-purple");
const dfsBar = document.querySelector(".progress-green");
const satkBar = document.querySelector(".progress-yellow");
const sdfsBar = document.querySelector(".progress-pink");
const spdBar = document.querySelector(".progress-orange");

// Fetch data from the API and update the HTML elements
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    posterImage.src = data.sprites.other["official-artwork"].front_default;
    posterTitle.textContent = data.name.toUpperCase();
    aboutInfo[0].textContent = `Height: ${data.height / 10}m`;
    aboutInfo[1].textContent = `Weight: ${data.weight / 10}kg`;
    aboutInfo[2].textContent = `Category: ${data.species.name}`;
    typeText.textContent = `Type: ${data.types.map(type => type.type.name).join(", ")}`;
    hpBar.style.width = `${data.stats[0].base_stat}%`;
    atkBar.style.width = `${data.stats[1].base_stat}%`;
    dfsBar.style.width = `${data.stats[2].base_stat}%`;
    satkBar.style.width = `${data.stats[3].base_stat}%`;
    sdfsBar.style.width = `${data.stats[4].base_stat}%`;
    spdBar.style.width = `${data.stats[5].base_stat}%`;
  });

  ///*****Function to click button***** */
  const pokeballButton = document.querySelector('.pokeball');

pokeballButton.addEventListener('click', () => {
  pokeballButton.classList.toggle('clicked');
});

