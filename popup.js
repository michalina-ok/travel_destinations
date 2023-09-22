const popup = document.getElementById("notification");
const close_icon = document.getElementById("close_icon")


document.addEventListener("DOMContentLoaded", function() {
    popup.classList.add("hide");
    closePopup();
});

//close pop-up when clicking on the icon
function closePopup() {
    window.close_icon.addEventListener("click", function() {
        popup.classList.add("hide")
        popup.classList.remove("show")
    })
  }

  //check if pop-up should be showed
const params = new URLSearchParams(window.location.search);
if (params.get("showPopup") === "true") {
    showPopup();
}

  function showPopup() {
        popup.classList.add("show")
  }