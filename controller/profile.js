import { profileApi } from "../api/profileApi.js";

const loadUser = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    window.location.replace("../login.html");
  }

  const form = document.querySelector("form#profile-form")

  const inputs = form.querySelectorAll(".form-field")

  for (let input of inputs) {
    const inputId = input.id
    input.value = user.user[inputId]
  }

}



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
    }
    uploadAvatar();
  } catch (error) {
    console.log(error);
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



window.onload = () => {
  loadUser()
}