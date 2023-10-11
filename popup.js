const popup = document.querySelector(".notification")
const close_icon = document.getElementById("close_icon")
const login_info = document.getElementById("login-info")
const login_button = document.getElementById("login-btn")
const popup_index = document.getElementById("notification_index");
const popup_login = document.getElementById("notification_login");


//notification "Your destination was added on index"
document.addEventListener("DOMContentLoaded", function() {
  const params = new URLSearchParams(window.location.search);
if (params.get("showPopup") === "true" || params.get("signedUp"))  {
    showPopup();
}
if (params.get("loggedIn"))  {
 showLoginInfo();
}
    closePopup();
});


//close pop-up when clicking on the icon
function closePopup() {
    window.close_icon.addEventListener("click", function() {
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
            popup.classList.remove("show");
          }, 3000);
  }

  function showLoginInfo(){
    login_info.classList.add("show")
    login_button.classList.add("hide")
  }



