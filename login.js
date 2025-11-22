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

  sound.currentTime = 0;

  if (!allFilled) {
    sound.play().catch(err => console.error("Audio play failed:", err));
    setTimeout(() => {
      window.alert("Please fill in all the inputs");
    }, 150);
    return;
  }

  sound.play().catch(err => console.error("Audio play failed:", err));
  setTimeout(() => {
    window.alert("Login Successful");
    window.location.href = "dashboard.html";
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
