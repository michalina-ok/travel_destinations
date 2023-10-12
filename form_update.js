

const apiEndPoint = "http://127.0.0.1:4000/destinations/";

//PREFILL THE FORM WITH THE DATA FROM THE DATABASE
window.addEventListener("DOMContentLoaded", async () => {

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


//CODE FOR UPDATING THE DATA
   // send the POST request
   const saveButton = document.getElementById("saveButton");
   saveButton.addEventListener("click", (e) => {
       e.preventDefault();
       collectData();
   });

async function collectData() {
    // Get values from the form inputs
const country = document.getElementById('country').value;
const title = document.getElementById('title').value;
const link = document.getElementById('link').value;
const arrivalDate = document.getElementById('arrivalDate').value
// Create a day.js object from the input value
const formattedArrivalDate = dayjs(arrivalDate).format('DD MMMM, YYYY');
const departureDate = document.getElementById('departureDate').value
// Create a day.js object from the input value
const formattedDepartureDate = dayjs(departureDate).format('DD MMMM, YYYY');
const imageInput = document.getElementById('file');
const description = document.getElementById('description').value;
//convert image to base64
const imageFile = imageInput.files[0];
const base64 = await imageToBase64(imageFile);

  // Validate the "title" and "country" fields
  if (!title || !country) {
   alert('Title and Country are required fields.');
   return; // Stop further processing if validation fails
}

   // Create an object with the collected data
   const updatedDestination = {
       country: country,
       title: title,
       link: link,
       arrivalDate: formattedArrivalDate,
       departureDate: formattedDepartureDate,
       image: base64,
       description: description,
     };
     updateDestination(updatedDestination);

   return updatedDestination;
 }


 //image convert 
 async function imageToBase64(file) {
    console.log(file, "file");
  /*   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = (error) => reject(error);
   }); */
 }



async function updateDestination(updatedDestination) {
    console.log(updatedDestination, "updatedDestination called");
    const currentUrl = window.location.href;

    // Create a URLSearchParams object from the URL
    const urlParams = new URLSearchParams(new URL(currentUrl).search);

    const objectId = urlParams.get("id");


    try {
        console.log(objectId, "objectId")
        const url = `http://127.0.0.1:4000/destinations/${objectId}`;
        const response =  await fetch(url, {
          method: "PUT",
          body: JSON.stringify({
              country: updatedDestination.country,
              title: updatedDestination.title,
              arrival_date: updatedDestination.arrivalDate,
              departure_date: updatedDestination.departureDate,
              image: updatedDestination.image,
              description: updatedDestination.description,
              link: updatedDestination.link
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const body = await response.json();
        console.log(response, "response");
        console.log(body, "body");
        if (response.ok) {
            console.log("Data sent to the server");
            //Call function to show message
            redirect();
        } else {
            console.error("Error sending data to the server");
        }
}
     catch (error) {
       console.error(error);
    }
}


function redirect() {
    alert("The destination was updated");
        setTimeout(() => {
        window.location.href = "index.html";
        }, 300);
}