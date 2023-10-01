import { base64ToImage } from "./utils/base64toImg.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://127.0.0.1:4000/destinations/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:4000/destinations/",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const body = await response.json();
    console.log(body, "body");
    
    if (!body || body.length === 0) {
      console.log("No destinations found");
      document.querySelector(".destinations-container").innerHTML = "No destinations found";
      return; // Exit the function if there are no destinations
    }
    transform(body);
    
    const base64value = Object.values(body)[0]?.image;
    console.log(base64value, "base64value");
    if (base64value) {
      base64ToImage(base64value);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});



function transform(data) {
  console.log(data, "data in transform function")
  const elements = Object.values(data).map((x) => {
      const clone = cloneTemplate();
      clone.querySelector(".country").innerText = x.country;
      clone.querySelector(".location").innerText = x.title;
      clone.querySelector(".description").innerText = x.description;
      clone.querySelector(".arrival-date").innerText = dayjs(x.arrival_date).format('DD MMMM, YYYY');
      clone.querySelector(".leave-date").innerText = dayjs(x.departure_date).format('DD MMMM, YYYY');
     /*  clone.querySelector(".destination_img").src = x.image; */
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
  
  