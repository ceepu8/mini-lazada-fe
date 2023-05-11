
function loadUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://smoky-mini-lazada-be.onrender.com/api/user");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer "+jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        if (objects["status"] == "ok") {
            const user = objects["user"]
            document.getElementById("name").innerHTML = user["name"];
            document.getElementById("avatar").src = user["avatar"];
            document.getElementById("username").innerHTML = user["username"];
            document.getElementById("address").innerHTML = user["address"];
            document.getElementById("email").innerHTML = user["email"];
            document.getElementById("businessName").innerHTML = user["businessName"];
            document.getElementById("businessAddress").innerHTML = user["businessAddress"];
        }
    }
};
}
      
loadUser();
      
    
var loadFile = function (event) {
    var image = document.getElementById("avatar");
    image.src = URL.createObjectURL(event.target.files[0]);
    };