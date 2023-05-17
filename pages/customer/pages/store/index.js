const apiUrl = "https://smoky-mini-lazada-be.onrender.com/api/product";

const numPd2 = document.querySelector(".numStore");
const storedNumber4 = localStorage.getItem("r1-name");
numPd2.innerHTML = storedNumber4;

// view data
const pokemonImage = document.querySelectorAll(".store-img");
const pokemonName = document.querySelectorAll(".name-pd");
const pokemonPrice = document.querySelectorAll(".hello");

function getPokemonData() {
  axios
    .get(apiUrl)
    .then(function (response) {
      for (let i = 0; i < 9; i++) {
        pokemonImage[i].src = response.data.products[i].image;
        pokemonName[i].innerHTML = response.data.products[i].name;
        pokemonPrice[i].innerHTML = response.data.products[i].price;
      }
    })
    .catch(function (error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
    });
}

getPokemonData();

// search data
const button = document.querySelector(".input2");
const searchHid = document.querySelectorAll(".pd2");
const input = document.querySelector(".input1");

function searchData() {
  axios
    .get(apiUrl)
    .then(function (response) {
      for (let m = 0; m < 9; m++) {
        if (input.value == response.data.products[m].name) {
          pokemonImage[0].src = response.data.products[m].image;
          pokemonName[0].innerHTML = response.data.products[m].name;
          pokemonPrice[0].innerHTML = response.data.products[m].price;
        }
      }
      for (let n = 1; n < 9; n++) {
        searchHid[n].remove();
      }
    })
    .catch(function (error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
    });
}

button.addEventListener("click", searchData);

// detail page
for (let r = 0; r < 9; r++) {
  pokemonName[r].addEventListener("click", function () {
    localStorage.setItem("r-name", r);
  });
}
