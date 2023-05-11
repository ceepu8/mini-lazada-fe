var user_login = localStorage.getItem("user_login");
if (user_login != null) {
  window.location.href = './index.html'
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = new XMLHttpRequest();
  user.open("POST", "https://smoky-mini-lazada-be.onrender.com/api/user/login");
  user.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  user.send(JSON.stringify({
    "username": username,
    "password": password
  }));
  user.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.user);
      console.log(objects);
      if (objects['status'] == 'ok') {
        localStorage.setItem("user_login", objects['accessToken']);
        then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });
      } else {
        $(".error_msg").html(
          '<div class="alert alert-danger" role="alert">Your password or username is incorrect. Please try again.</div>'
        );
      }
    }
  };
  return false;
}