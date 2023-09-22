const apiEndPoint = "http://127.0.0.1:4000/destination";
const file = document.getElementById('file').value;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('new-destination');
    let destinationArray = [];
    
form.addEventListener('submit', sendForm);

async function sendForm(event) {
    console.log('sendForm called');
    event.preventDefault(); 
    
    // collect the input values and create an object
    await collectDestinationData();

    redirect();


}

function redirect() {
  // Redirect to the main page
  window.location.href = 'index.html?showPopup=true';
 
}


 async function collectDestinationData() {
     // Get values from the form inputs
 const country = document.getElementById('country').value;
 const title = document.getElementById('title').value;
 /* const link = document.getElementById('link').value; */
 const arrivalDate = document.getElementById('arrivalDate').value
const departureDate = document.getElementById('departureDate').value
const imageInput = document.getElementById('file');
const description = document.getElementById('description').value;
 //convert image to base64
 const imageFile = imageInput.files[0];
 const base64 = await imageToBase64(imageFile);

  

    // Create an object with the collected data
    const destinationData = {
        country: country,
        title: title,
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        image: base64,
        description: description
      };

    destinationArray.push(destinationData);

    
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
      const response =  fetch(apiEndPoint, {
        method: "POST",
        body: JSON.stringify({
            country: destinationData.country,
            title: destinationData.title,
            arrival_date: destinationData.arrivalDate,
            departure_date: destinationData.departureDate,
            image: destinationData.image,
            description: destinationData.description
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

  
      if (response.ok) {
        const data =  await response.json();
        console.log(data); // Handle the response from the server if needed
      } else {
        console.error("Error sending data to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }});
  





