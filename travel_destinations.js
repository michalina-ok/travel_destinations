import { base64ToImage } from "./utils/base64toImg.js";
import deleteEntry from "./delete.js";

window.addEventListener("DOMContentLoaded", async () => {
  
  const response = await fetch("http://127.0.0.1:4000/destinations/", {
   method: "GET",
   headers: {
     "Content-type": "application/json",
     "Access-Control-Allow-Origin": "http://127.0.0.1:4000/destinations/",
   },
  })
  const body = await response.json()
  const base64value = Object.values(body)[0].image;
  const imageElement = base64ToImage(base64value);
  transform(body);
})



function transform(data) {
  console.log("transform called", data);

  //clear existing content 
  const container = document.querySelector(".destinations-container");
  container.innerHTML = "";
  
  const elements = data.map((x) => {
    console.log(x, "x");
      const clone = cloneTemplate();
      clone.querySelector(".destination-card").id = x._id;
      clone.querySelector(".country").innerText = x.country;
      clone.querySelector(".location").innerText = x.title;
      clone.querySelector(".description").innerText = x.description;
      clone.querySelector(".arrival-date").innerText = dayjs(x.arrival_date).format('DD MMMM, YYYY');
      clone.querySelector(".leave-date").innerText = dayjs(x.departure_date).format('DD MMMM, YYYY');
      clone.querySelector(".destination_img").src = x.image;
      clone.querySelector("#delete-button").style.display = 'block';
      clone.querySelector("#delete-button").addEventListener("click", deleteEntry)
           // Loop through each button and show/hide based on authentication status

    /*        deleteButtons.forEach(button => {
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (isLoggedIn === "true") {
                console.log("logged in true")
                clone.querySelector("#delete-button").style.display = "block" // Show the button for authenticated users
            }
        }); */
      if (x.link === "") {
        clone.querySelector(".google-maps").remove();
      } else {
        clone.querySelector(".google-maps").href = x.link;
      }
     // Set the data-id attribute to the object's ID
    clone.querySelector(".destination-card").id = x._id;

      return clone;
    });
  
    document.querySelector(".destinations-container").append(...elements)
  }
  
  function cloneTemplate() {
    const template = document.querySelector(".ui-card");
    const clone = document.importNode(template.content, true);
    return clone;
  }


  const container = document.querySelector(".destinations-container");

container.addEventListener("click", (e) => {
    if (e.target.classList.contains("update-button")) {
        //get the parent destination card id 
        const cardId = e.target.parentElement.id;


         //Construct the URL with the object's ID as a query parameter
         const url = `/form_update.html?id=${cardId}`;


         // Set the href attribute of the link element
          window.location.href = url; 
    }

})

    const deleteButtons = document.querySelectorAll("#delete-button");
    deleteButtons.forEach(button => {
      button.addEventListener("click", async () => {
        deleteEntry()
      });
    })

    export default transform
  
  window.addEventListener("load", transform)



  