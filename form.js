const apiEndPoint = "http://127.0.0.1:4000/destinations";


document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById('new-destination');
    let destinationArray = [];
    
form.addEventListener('submit', await sendForm);

async function sendForm(event) {
    console.log('sendForm called');
    event.preventDefault(); 
    
    // collect the input values and create an object
    await collectDestinationData();

    
}

function redirect() {
  // Redirect to the main page
  window.location.href = 'index.html?showPopup=true';
 
}


 async function collectDestinationData() {
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
    const destinationData = {
        country: country,
        title: title,
        link: link,
        arrivalDate: formattedArrivalDate,
        departureDate: formattedDepartureDate,
        image: base64,
        description: description,
      };


    
      // send the POST request
      await insertData(destinationData); 



    return destinationData;
  }


  async function imageToBase64(file) {
     return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

   async function insertData(destinationData) {
    
    try {
      const response =  await fetch(apiEndPoint, {
        method: "POST",
        body: JSON.stringify({
            country: destinationData.country,
            title: destinationData.title,
            arrival_date: destinationData.arrivalDate,
            departure_date: destinationData.departureDate,
            image: destinationData.image,
            description: destinationData.description,
            link: destinationData.link
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

  
      if (response.ok) {
        const data =  await response.json();
        console.log(data); // Handle the response from the server if needed
        redirect();
        showPopup(document.querySelector("#notification_index p"), "Your destination was added");
      } else {
        console.error("Error sending data to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }}
  });
  





