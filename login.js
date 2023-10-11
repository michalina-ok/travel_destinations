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
          // set token expiration time to 20 minutes
          localStorage.setItem("expirationTime", new Date().getTime() + 20 * 60 * 1000);
          loginForm.reset();
          setTimeout( () => {
          window.location.href = "index.html?loggedIn";
          }, 300)
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


/* function checkLoginStatus() {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  if (token && expirationTime && new Date().getTime() < expirationTime) {
    // Token is still valid
    console.log("Token is still valid");
    document.querySelector("#log-in-btn").innerHTML = "Sign out";
  } else {
    // Token has expired or is not present
    console.log("Token has expired or is not present");
    localStorage.removeItem("token");
  }
}
export default checkLoginStatus; */
