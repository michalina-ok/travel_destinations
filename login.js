const loginEndpoint = "http://127.0.0.1:4000/auth/login";

document.querySelector("#log-in-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const loginForm = document.querySelector("#login");
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    let processedInput;
    if (email.length && password.length) {
      processedInput = {
        email,
        password,
      };
    } else {
      processedInput = null;
    }
     
    if(processedInput) {
      fetch(loginEndpoint, {
        method: "POST",
        body: JSON.stringify(processedInput),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === false) {
          //call function to show invalid credentials message on the UI
          console.log("invalid credentials");
        } else {
          //call function to show success message on the UI
          console.log(res.token, "login successful");
          loginForm.reset();
          window.location.href = "index.html";
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("MongoDB Connection Closed");
        mongoose.disconnect();
      });

   /*    if (response.ok) {
        const data =  await response.json();
        console.log(data); 
        format.reset();
        
        // Handle the response from the server if needed
      } else {
        console.error("Error sending data to the server.");
        //call function to show error message on the UI
      } */
    } else {
      console.log("invalid input");
      //call function to show invalid input message on the UI
    }
      
});