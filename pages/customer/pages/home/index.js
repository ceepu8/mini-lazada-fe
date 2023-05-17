const apiUrl = "https://smoky-mini-lazada-be.onrender.com/api/product";
// view data
const pokemonImage3 = document.querySelectorAll(".indexImage");
const pokemonName3 = document.querySelectorAll(".indexName");
const pokemonPrice3 = document.querySelectorAll(".indexPrice");

const pokemonImage4 = document.querySelectorAll(".indexImage1");
const pokemonName4 = document.querySelectorAll(".indexName1");
const pokemonPrice4 = document.querySelectorAll(".indexPrice1");

const numPd1 = document.querySelector(".indexCart");
const storedNumber3 = localStorage.getItem("r1-name");
numPd1.innerHTML = storedNumber3;

function getPokemonData() {
  axios
    .get(apiUrl)
    .then(function (response) {
      for (let i = 0; i < 6; i++) {
        pokemonImage3[i].src = response.data.products[i].image;
        pokemonName3[i].innerHTML = response.data.products[i].name;
        pokemonPrice3[i].innerHTML = response.data.products[i].price;

        pokemonImage4[i].src = response.data.products[i].image;
        pokemonName4[i].innerHTML = response.data.products[i].name;
        pokemonPrice4[i].innerHTML = response.data.products[i].price;
      }
    })
    .catch(function (error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
    });
}

getPokemonData();
