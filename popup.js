const popup = document.querySelector(".notification")
const close_icon = document.getElementById("close_icon")
const login_info = document.getElementById("login-info")
const displayedUser = document.getElementById("userName")
const login_button = document.getElementById("login-btn")
const popup_index = document.getElementById("notification_index");
const popup_login = document.getElementById("notification_login");


//notification "Your destination was added on index"
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  //console.log(params.ha("loggedIn"), "params");
if (params.has("showPopup") === "true" || params.has("signedUp"))  {
  console.log("params are = showPopup or signedUp");
    showPopup();
}
if (params.has("loggedIn"))  {
  console.log("params are = loggedIn")
 showLoginInfo();
}
    closePopup();
});


//close pop-up when clicking on the icon
function closePopup() {
    window.close_icon.addEventListener("click", () => {
        popup.classList.add("hide")
        popup.classList.remove("show")
    })
  }

  //check if pop-up on the index should be showed


  //check if pop-up on the log-in should be showed

 

  function showPopup() {
    console.log("calling showPopup")
        popup.classList.add("show")
        setTimeout(() => {
            popup.classList.add("fade-out");
          }, 3000);
  }

  function showLoginInfo(user){
    console.log(user, "user")
    console.log("calling showLoginInfo")
    displayedUser.textContent = user;
    login_info.classList.add("show")
    login_button.classList.add("hide")
  }



