import { base64ToImage } from "./utils/base64toImg.js";
//PREFILL THE FORM WITH THE DATA FROM THE DATABASE


window.addEventListener("load", async () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Create a URLSearchParams object from the URL
    const urlParams = new URLSearchParams(new URL(currentUrl).search);

    // Get the 'id' query parameter from the URL
    const objectId = urlParams.get("id");

    // Check if 'id' is found in the URL
    if (objectId) {
        console.log(objectId, "objectId");
        const url = `http://127.0.0.1:4000/destinations/${objectId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
           })


           console.log(response, "response");
           const body = await response.json()
           console.log(body, "body");

           //prefill the input fields
           const country = document.getElementById('country');
           const title = document.getElementById('title');
           const link = document.getElementById('link');
           const arrivalDate = document.getElementById('arrivalDate')
           // Create a day.js object from the input value
           const formattedArrivalDate = dayjs(arrivalDate).format('DD MMMM, YYYY');
           const departureDate = document.getElementById('departureDate')
           // Create a day.js object from the input value
           const formattedDepartureDate = dayjs(departureDate).format('DD MMMM, YYYY');
           const description = document.getElementById('description');
     

           country.value = body.country || '';
           title.value = body.title || '';
           link.value = body.link || '';
           const toInsertArrival = dayjs(body.arrival_date).format('YYYY-MM-DD');
           arrivalDate.value =  toInsertArrival || '';
           const toInsertDeparture = dayjs(body.departure_date).format('YYYY-MM-DD');
           departureDate.value = toInsertDeparture || '';
           description.value = body.description || ''; 
    } else {
        console.log("'id' query parameter not found in the URL");
    }
});





/* 
window.addEventListener("load", async () => {
    const BASE_URL = "http://form_update.html?id=";

    const response = await fetch(BASE_URL);
    console.log(response);
    const body = await response.json();
    console.log(body);
    return body;
      
})
 */
//CODE FOR UPDATING THE DATA











