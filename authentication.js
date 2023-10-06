    //logic for authentication      
    const isAuthenticated = false;
      
      
      // Get all buttons with the class "auth-button"
      const deleteButtons = document.querySelectorAll('.delete-button');

      // Loop through each button and show/hide based on authentication status
      deleteButtons.forEach(button => {
          if (isAuthenticated) {
              console.log("true")
              button.style.display = 'inline-block'; // Show the button for authenticated users
          } else {
              console.log("false")
              button.style.display = 'none'; // Hide the button for unauthenticated users
          }
      });