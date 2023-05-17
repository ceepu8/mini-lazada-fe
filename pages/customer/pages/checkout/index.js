const apiUrl2 = "https://smoky-mini-lazada-be.onrender.com/api/product";
const deleteDa1 = document.querySelectorAll(".dele1");
const name1 = document.querySelectorAll(".name");
const price1 = document.querySelectorAll(".price");
const priceTotal1 = document.querySelector(".priceTotal");
var count = 0;
var arrNames = [];
//localStorage.productNames = JSON.stringify(arrNames);
let $savedClassName1 = $(".dele1");
var arrNames = JSON.parse(localStorage.productNames);
//
const numPd1 = document.querySelector(".numPd");
const storedNumber3 = localStorage.getItem("r1-name");
numPd1.innerHTML = storedNumber3;
//
console.log(arrNames);
for (let fil = 2; fil >= 0; fil--) {
  deleteDa1[fil].remove();
}
function viewData() {
  axios
    .get(apiUrl2)
    .then(function (response) {
      for (let vd = 0; vd < arrNames.length; vd++) {
        $(".order").append($savedClassName1[vd]);
        price1[vd].innerHTML = response.data.products[arrNames[vd]].price;

        name1[vd].innerHTML = response.data.products[arrNames[vd]].name;
      }
      for (let vd1 = 0; vd1 < arrNames.length; vd1++) {
        count = count + response.data.products[arrNames[vd1]].price;
      }

      priceTotal1.innerHTML = count;
      count = 0;
    })
    .catch(function (error) {
      //pokemonName.innerHTML = "(An error has occurred.)";
      //pokemonImage.src = "";
    });
}

viewData();
