// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const errorModal = document.getElementById("modal");
  const errorMessage = document.getElementById("modal-message");
  const hearts = document.querySelectorAll(".like-glyph");

  // Add .hidden class to error modal
  errorModal.classList.add("hidden");

  // Function to handle heart click
  function handleHeartClick(event) {
    const heart = event.target;

    // Check if heart is empty or full
    if (heart.classList.contains("activated-heart")) {
      // Heart is full, change it back to empty
      heart.classList.remove("activated-heart");
      heart.textContent = EMPTY_HEART;
    } else {
      // Heart is empty, make server call
      mimicServerCall()
        .then(() => {
          // Server call successful, change heart to full
          heart.classList.add("activated-heart");
          heart.textContent = FULL_HEART;
        })
        .catch(error => {
          // Server call failed, display error message
          errorMessage.textContent = error;
          errorModal.classList.remove("hidden");
          setTimeout(() => {
            // Hide error modal
            errorModal.classList.add("hidden");
          }, 3000);
        });
    }
  }

  // Add click event listener to each heart
  hearts.forEach(heart => {
    heart.addEventListener("click", handleHeartClick);
  });
});