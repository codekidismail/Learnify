// const inputs = document.querySelectorAll("input");
// const login = document.querySelector(".log-button");

// login.addEventListener('click', function (event) {
//     event.preventDefault();

//     let allFilled = true;
//     inputs.forEach(input => {
//         if (input.value.trim() === "") {
//             allFilled = false;
//         }
//     });

//     if (!allFilled) {
//         window.alert("Please fill in all the inputs")
//         return;
//     }
//     window.alert("Login Successful")
//     window.location.href = "index.html";
// })

const inputs = document.querySelectorAll("input");
const login = document.querySelector(".log-button");
const sound = document.getElementById("alertSound");

login.addEventListener("click", function (event) {
  event.preventDefault();

  let allFilled = true;
  inputs.forEach(input => {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });

  sound.currentTime = 0; // restart the sound from beginning

  if (!allFilled) {
    // Play alert sound, then show the popup slightly later
    sound.play().catch(err => console.error("Audio play failed:", err));
    setTimeout(() => {
      window.alert("Please fill in all the inputs");
    }, 150);
    return;
  }

  // If all fields are filled
  sound.play().catch(err => console.error("Audio play failed:", err));
  setTimeout(() => {
    window.alert("Login Successful");
    window.location.href = "index.html";
  }, 150);
});

window.addEventListener("load", function(){
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800); 
    }, 2000); 
});
