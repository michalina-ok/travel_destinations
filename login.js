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
          console.log(res, "login successful response");
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.email);
          // set token expiration time to 2 minutes
          localStorage.setItem("expirationTime", new Date().getTime() + 2 * 60 * 1000);
          loginForm.reset();
          showPopup(document.querySelector("#notification_login p"), "Successfully logged in");
          setTimeout( () => {
          window.location.href = "index.html?loggedIn";
          }, 1000)
          showLoginInfo();
        }
      })
      .catch((err) => {
        console.log(err);
      })

    } else {
      console.log("invalid input");
      //call function to show invalid input message on the UI
    }
      
});




