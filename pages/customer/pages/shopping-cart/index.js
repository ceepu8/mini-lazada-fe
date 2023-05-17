const apiUrl1 = "https://smoky-mini-lazada-be.onrender.com/api/product";
// button, div name, icon delete
const el1 = document.querySelectorAll(".hel");
const el2 = document.querySelector(".verifyOrder");
const deleteDa1 = document.querySelectorAll(".hello1");
const shopNum1 = document.querySelector(".shopNum1");
let $savedClassName = $(".hello1");
// get local storage r1,r
var ghk = localStorage.getItem("r1-name");
const ghj = localStorage.getItem("r-name");

//

/*const pokemon = [];

const storedNumber1 = localStorage.getItem('r2-name');

var parNum1 = parseInt(storedNumber1);
//for(let r = 0; r < ghk;r++) {
    pokemon[parNum1] = ghj;
    //parNum1 = parNum1 + 1;
    //console.log(parNum1);
    console.log(pokemon);
    //localStorage.setItem('r2-name', parNum1);
//}*/

/// update product

//var parNum1 = parseInt(storedNumber1);

var storedNames1 = JSON.parse(localStorage.names);

var num1 = parseInt(localStorage.getItem("r2-name"));
/*if(ghk > 0)
{

    storedNames1[num1] = parseInt(ghj);
    localStorage.names = JSON.stringify(storedNames1);
    num1 = num1 + 1;
    localStorage.setItem("r2-name",num1);
    console.log("hello"+num1);
   

}*/
/*console.log(storedNames1);
for(let x = 0; x < storedNames1.length; x++)
{
    storedNames1[x] = null;
}*/

// get data
const pokemonImage2 = document.querySelectorAll(".scImage");
const pokemonName2 = document.querySelectorAll(".scName");
const pokemonPrice2 = document.querySelectorAll(".scPrice");
// clicked x button
if (el1) {
  for (let dele = 0; dele < 9; dele++) {
    el1[dele].addEventListener(
      "click",
      function () {
        // delete cart on shop screen
        deleteDa1[dele].remove();
        // number of product
        ghk = ghk - 1;
        localStorage.setItem("r1-name", ghk);
        // delete cart on array
        storedNames1.splice(dele, 1);
        console.log(storedNames1);
        localStorage.names = JSON.stringify(storedNames1);
        // icon cart
        shopNum1.innerHTML = ghk;
      },
      false
    );
  }
}
// click verify button
if (el2) {
  el2.addEventListener(
    "click",
    function () {
      // delete cart on shop screen
      for (let dele1 = 0; dele1 < 9; dele1++) {
        deleteDa1[dele1].remove();
      }

      // number of product
      ghk = 0;
      localStorage.setItem("r1-name", ghk);
      // delete cart on array
      var b = 0;
      localStorage.productNames = JSON.stringify(storedNames1);
      storedNames1.splice(0, storedNames1.length);
      console.log(storedNames1);
      localStorage.names = JSON.stringify(storedNames1);
      // icon cart
      shopNum1.innerHTML = 0;
    },
    false
  );
}

// shopping cart
for (let fil = 8; fil >= 0; fil--) {
  deleteDa1[fil].remove();
}
function addData() {
  axios
    .get(apiUrl1)
    .then(function (response) {
      shopNum1.innerHTML = ghk;
      if (ghk > 0) {
        for (let vd = 0; vd < ghk; vd++) {
          $(".pricePd").append($savedClassName[vd]);
          pokemonPrice2[vd].innerHTML =
            response.data.products[storedNames1[vd]].price;
          pokemonImage2[vd].src =
            response.data.products[storedNames1[vd]].image;
          pokemonName2[vd].innerHTML =
            response.data.products[storedNames1[vd]].name;
        }
      }
      console.log(el1[0]);
    })
    .catch(function (error) {
      //pokemonName.innerHTML = "(An error has occurred.)";
      //pokemonImage.src = "";
    });
}

addData();
