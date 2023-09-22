import { base64ToImage } from "./utils/base64toImg.js";
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
  console.log(body)
  body.forEach(element => {
    console.log(element.link, "link of each elem")
  });
  transform(body);
})



function transform(data) {
  const elements = data.map((x) => {
      const clone = cloneTemplate();
      clone.querySelector(".country").innerText = x.country;
      clone.querySelector(".location").innerText = x.title;
      clone.querySelector(".description").innerText = x.description;
      clone.querySelector(".arrival-date").innerText = dayjs(x.arrival_date).format('DD MMMM, YYYY');
      clone.querySelector(".leave-date").innerText = dayjs(x.departure_date).format('DD MMMM, YYYY');
      clone.querySelector(".destination_img").src = x.image;
      if (x.link === "") {
        clone.querySelector(".google-maps").remove();
      } else {
        clone.querySelector(".google-maps").href = x.link;
      }
      return clone;
    });
  
    document.querySelector(".destinations-container").append(...elements)
  }
  
  function cloneTemplate() {
    const template = document.querySelector(".ui-card");
    const clone = document.importNode(template.content, true);
    return clone;
  }
  
  window.addEventListener("load", transform)
  