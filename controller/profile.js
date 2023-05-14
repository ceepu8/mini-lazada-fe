import { profileApi } from "../api/profileApi.js";

function loadUser() {
  // const data = new XMLHttpRequest();
  // data.open("GET", "https://smoky-mini-lazada-be.onrender.com/api/user");
  // data.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // data.setRequestHeader("Authorization", "Bearer " + jwt);
  // data.send();
  // data.onreadystatechange = function () {
  //   if (this.readyState == 4) {
  //     const objects = JSON.parse(this.responseText);
  //     if (objects["status"] == "ok") {
  //       const user = objects["user"]
  //       document.getElementById("name").innerHTML = user["name"];
  //       document.getElementById("avatar").src = user["avatar"];
  //       document.getElementById("username").innerHTML = user["username"];
  //       document.getElementById("address").innerHTML = user["address"];
  //       document.getElementById("email").innerHTML = user["email"];
  //       document.getElementById("businessName").innerHTML = user["businessName"];
  //       document.getElementById("businessAddress").innerHTML = user["businessAddress"];
  //     }
  //   }
  // };
}

loadUser();


const uploadAvatar = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const avatar = document.querySelector(
    ".container .row .avatar"
  );
  try {
    const { data } = await vendorApi.getMyAvatar(user.accessToken);


    const html = data.products.reduce((result, product, idx) => {
      const { file } = product;

      return (
        result +
        `
                <div class="avatar">
                    <img alt="avatar" src="${file}"/>
                </div>
              `
      );
    }, "");
    avatar.innerHTML = html;

  } catch (error) {
    console.log(error);
  }
};

const addAvatar = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  const file = document.getElementById("file").files[0];

  formData.append("file", file);

  try {
    const { data, status } = await profileApi.createAvatar(
      user.accessToken,
      formData
    );
    if (status === 200) {
      new AWN().success(data.message, {
        durations: { success: 1000 },
      });
    }

    uploadAvatar();
  } catch (error) {
    console.log(error);
    new AWN().alert(error.message, {
      durations: { success: 1000 },
    });
  }
};

window.loadFile = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.querySelector(
        "#product .modal .modal-dialog .modal-body .form-group-upload-image .preview-image"
      ).innerHTML = `<img src="${e.target.result}" alt="product-image"/>`;
    };

    reader.readAsDataURL(input.files[0]);
  }

  addAvatar();
};


