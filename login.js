const loginEndpoint = "http://127.0.0.1:4000/auth/login";

document.querySelector("#log-in-btn").addEventListener("click", async (e) => {
    e.preventDefault();

        const response =  await fetch(loginEndpoint, {
          method: "POST",
          body: JSON.stringify({
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
    
        if (response.ok) {
          const data =  await response.json();
          console.log(data); 
          
          
          // Handle the response from the server if needed
        } else {
          console.error("Error sending data to the server.");
        }
});