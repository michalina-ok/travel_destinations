const form = document.getElementById('new-destination');
let destinationArray = [];

form.addEventListener('submit', (event) => {
    event.preventDefault(); 
  
    // collect the input values and create an object
    const destinationData = collectDestinationData();
  
    // For example, you can send it to your API endpoint via AJAX
    destinationArray.push(destinationData);
  
    // Reset the form (optional)
    form.reset();
  
    // You can log or work with the destinationData object here
    console.log(destinationData);
  });

  function collectDestinationData() {
    // Get values from the form inputs
    const country = document.getElementById('country').value;
    const title = document.getElementById('title').value;
    const link = document.getElementById('link').value;
    const arrivalDate = document.getElementById('arrivalDate').value;
    const departureDate = document.getElementById('departureDate').value;
    const file = document.getElementById('file').value;
    const description = document.getElementById('description').value;
  
    // Create an object with the collected data
    const destinationData = {
      country,
      title,
      link,
      arrivalDate,
      departureDate,
      file,
      description,
    };
  
    return destinationData;
  }