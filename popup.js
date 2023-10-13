const popup = document.querySelector(".notification");
const close_icon = document.getElementById("close_icon");
const login_info = document.getElementById("login-info");
const displayedUser = document.getElementById("userName");
const login_button = document.getElementById("log-in-btn");
const popup_index = document.getElementById("notification_index");
const popup_login = document.getElementById("notification_login");

//notification "Your destination was added on index"
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  //console.log(params.ha("loggedIn"), "params");
  if (params.has("loggedIn")) {
    console.log("params are = loggedIn");
    showLoginInfo();
  }
  closePopup();
});

//close pop-up when clicking on the icon
function closePopup() {
  window.close_icon.addEventListener("click", () => {
    popup.classList.add("hide");
    popup.classList.remove("show");
  });
}


function showPopup(messageElement, message) {
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
  messageElement.innerHTML = message;
}

function showLoginInfo() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const expirationTime = localStorage.getItem("expirationTime");

  if (token && expirationTime && new Date().getTime() < expirationTime) {
    // Token is still valid
    login_button.classList.add("hide");
    login_info.classList.add("show");

    displayedUser.innerHTML = `Logged in as ${username}`;
    console.log("Token is still valid");
    document.querySelector("#log-in-btn").classList.add("hide");
  } else {
    // Token has expired or is not present
    console.log("Token has expired or is not present");
    localStorage.removeItem("token");
  }
}