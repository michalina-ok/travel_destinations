
import transform from "./travel_destinations.js";

const token = localStorage.getItem("token");

const deleteButtons = document.querySelectorAll("#delete-button");
deleteButtons.forEach(button => {
    button.addEventListener("click", async (e) => {
    deleteEntry(e);
    })

})
const deleteEntry = async (e) => {
    console.log("deleteEntry called");
    const cardId = e.target.parentElement.id;
    console.log(cardId  + "cardId");
    console.log(e.target, "e.target");
    console.log(e.target.parentElement, "e.target.parentElement");
    console.log(e.target.parentElement.id, "e.target.parentElement.id");
    if(token) {
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
    } else {
        alert("You must be logged in to delete a destination");
    }
}

export default deleteEntry

