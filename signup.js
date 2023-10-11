const apiEndPoint = "http://127.0.0.1:4000/auth/signup";

document.querySelector("#sign-up-btn").addEventListener("click", async (e) => {
    e.preventDefault();

        const response =  await fetch(apiEndPoint, {
          method: "POST",
          body: JSON.stringify({
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
   setTimeout( () => {
    showPopUp()
   }, 3000)
    
        if (response.ok) {
          const data =  await response.json();
         //showPopup();
          window.location.href = "login.html?signedUp";
          console.log(data); // Handle the response from the server if needed
        } else {
          console.error("Error sending data to the server.");
        }
});