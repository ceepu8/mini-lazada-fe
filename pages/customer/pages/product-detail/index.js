const apiUrl = "https://smoky-mini-lazada-be.onrender.com/api/product";

// detail page

const pokemonImage1 = document.querySelectorAll(".dImage");
const pokemonName1 = document.querySelector(".detailName");
const pokemonPrice1 = document.querySelector(".detailPrice");
const pokemonDes1 = document.querySelector(".detailDes");
const ghj = localStorage.getItem("r-name");

function detailData() {
  axios
    .get(apiUrl)
    .then(function (response) {
      console.log("hello");
      console.log(ghj);
      pokemonPrice1.innerHTML = response.data.products[ghj].price;
      pokemonDes1.innerHTML = response.data.products[ghj].description;
      pokemonName1.innerHTML = response.data.products[ghj].name;
      for (let m = 0; m < 5; m++) {
        pokemonImage1[m].src = response.data.products[ghj].image;
      }
    })
    .catch(function (error) {
      pokemonName.innerHTML = "(An error has occurred.)";
      pokemonImage.src = "";
    });
}

detailData();

// shopping cart

// ô chứa set ,get count

const shopNum = document.querySelector(".shopNum");
var count = 0;
// Save the number in Local Storage
// localStorage.setItem('myNumber', 0);
// Retrieve the number from Local Storage
const storedNumber = localStorage.getItem("r1-name");
var parNum = parseInt(storedNumber);
//
var names = []; // create array cart
//localStorage.names = JSON.stringify(names);
//
if (parNum > 0) {
  // filter
  count = parNum;
  shopNum.innerHTML = count;
  names = JSON.parse(localStorage.names);
}
console.log(parNum); // Output: 123

var storedNames = JSON.parse(localStorage.names);
console.log(storedNames);

///
///

const el = document.getElementById("but1");
if (el) {
  el.addEventListener(
    "click",
    function () {
      count = count + 1;
      //console.log(count);
      localStorage.setItem("r1-name", count);
      shopNum.innerHTML = count;
      //
      localStorage.setItem("r2-name", count);
      names.push(ghj);
      localStorage.names = JSON.stringify(names);
      /*var storedNames1 = JSON.parse(localStorage.names)
            console.log(storedNames1);*/
      //
    },
    false
  );
}
