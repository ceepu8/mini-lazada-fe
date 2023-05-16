window.handleLogout = () => {
  localStorage.removeItem("user");
  location.reload();
};
