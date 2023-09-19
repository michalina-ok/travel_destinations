const form = document.getElementById('new-destination');
const apiEndPoint = "http://127.0.0.1:4000/destinations";
const file = document.getElementById('file').value;
let destinationArray = [];

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 
  
    // collect the input values and create an object
    const destinationData = await collectDestinationData();
  
    // For example, you can send it to your API endpoint via AJAX
    destinationArray.push(destinationData);
  
    // Reset the form (optional)
    form.reset();
  
    // You can log or work with the destinationData object here
    console.log(destinationData);
  });

 async function collectDestinationData() {
     // Get values from the form inputs
 const country = document.getElementById('country').value;
 const title = document.getElementById('title').value;
 const link = document.getElementById('link').value;
 const arrivalDate = document.getElementById('arrivalDate').value;
 const departureDate = document.getElementById('departureDate').value;
 const imageInput = document.querySelector("#file");
 const description = document.getElementById('description').value;

  
 //convert image to base64
 const imageFile = imageInput.files[0];
 const base64 = await imageToBase64(imageFile);

  

    // Create an object with the collected data
    const destinationData = {
        country,
        title,
        link,
        arrivalDate,
        departureDate,
        image: base64,
        description,
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
      const response = await fetch(apiEndPoint, {
        method: "POST",
        body: JSON.stringify(destinationData),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response from the server if needed
      } else {
        console.error("Error sending data to the server.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }



