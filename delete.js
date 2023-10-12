
import transform from "./travel_destinations.js";

const token = localStorage.getItem("token");
const deleteEntry = () => {
    const deleteButtons = document.querySelectorAll("#delete-button");
    if(token) {
        deleteButtons.forEach(button => {
            button.addEventListener("click", async (e) => {
                console.log("deleteEntry called");
                const cardId = e.target.parentElement.id;
                console.log(cardId);
                const response = await fetch(`http://127.0.0.1:4000/destinations/${cardId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    // If DELETE request is successful, initiate a GET request to fetch updated data
                    const getResponse = await fetch("http://127.0.0.1:4000/destinations");
                    if (getResponse.ok) {
                      const newData = await getResponse.json();
                      
                      // Update the UI with the new data (you can call a function to handle this)
                      transform(newData);
                    }
                }
                
    
            })
    
        })
    } else {
        console.log("not authorized to delete destinations");
    }
  
}

export default deleteEntry

