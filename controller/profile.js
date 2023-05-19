import { profileApi } from "./apis/profileApi.js";

const loginBtn = document.querySelector(".btn.submit-btn");
const spinner = `
    <span
    class="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
    ></span>
    Loading...
`;

const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);

    const { data } = await profileApi.getProfile(user.accessToken);
    if (!data) {
      window.location = "/pages/login.html";
    }
    const form = document.querySelector("form#profile-form");

    const inputs = form.querySelectorAll(".form-field");

    for (let input of inputs) {
      const inputId = input.id;
      input.value = data.data[inputId];
    }

    const imageURL = data.data.profileImage || "../../assets/browser-icon.webp";

    const imageElement = document.getElementById("profile-image");
    imageElement.src = imageURL;

    loginBtn.innerHTML = "Change Avatar";
    loginBtn.removeAttribute("disabled");
  } catch (error) {
    console.log(error);
  }
};

const loadUser = async () => {
  const { user } = JSON.parse(localStorage.getItem("user"));

  const form = document.querySelector("form#profile-form");
  const inputs = form.querySelectorAll(".form-field");

  for (let input of inputs) {
    const inputId = input.id;
    input.value = user[inputId];
  }

  const imageURL = user.profileImage || "../../assets/browser-icon.webp";

  const imageElement = document.getElementById("profile-image");
  imageElement.src = imageURL;

  loginBtn.innerHTML = "Change Avatar";
  loginBtn.removeAttribute("disabled");
};

const addAvatar = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  const file = document.getElementById("file").files[0];

  formData.append("file", file);

  try {
    loginBtn.innerHTML = spinner;
    loginBtn.setAttribute("disabled", true);
    const { data, status } = await profileApi.uploadAvatar(
      user.accessToken,
      formData
    );
    if (status === 200) {
      swal({
        title: data.message,
        icon: "success",
        button: "Close",
      });
      getProfile();
    }
  } catch (error) {
    console.log(error);
    swal({
      title: "ERROR!",
      text: error.response?.data?.message,
    });
  }
  loginBtn.innerHTML = "Change Avatar";
  loginBtn.removeAttribute("disabled");
};

window.loadFile = (input) => {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      const imageElement = document.getElementById("profile-image");
      imageElement.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }

  addAvatar();
};

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location = "/pages/login.html";
  }
  loadUser();
};
