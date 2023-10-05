//CODE FOR PRE-FILLING THE DATA
const container = document.querySelector(".destinations-container");

container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("update-button")) {
        //grab the update btn
        const updateLink = document.querySelector(".update-button");

        //get the parent destination card id 
        const cardId = e.target.parentElement.id;

         //Construct the URL with the object's ID as a query parameter
         const url = `/form_update.html?id=${cardId}`;
            // Set the href attribute of the link element
            window.location.href = url;
    }

    
})


//CODE FOR UPDATING THE DATA











