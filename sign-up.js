const inputs = document.querySelectorAll("input");
const signUp = document.querySelector(".button");
const email = document.querySelector(".email");

const alertSound = new Audio("audio/Alert.mp3");

signUp.addEventListener('click', function (event) {
    event.preventDefault();

    let allFilled = true;
    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    if (!allFilled) {
        alertSound.play().then(() => {
            window.alert("Please fill in all the inputs");
        });
        return;
    }

    if (!email.value.toLowerCase().endsWith("@gmail.com")) {
        alertSound.play().then(() => {
            window.alert("Invalid Gmail! Please enter a valid Gmail account");
        });
        return;
    }

    alertSound.play().then(() => {
        window.alert("Sign-up Successful");
        window.location.href = "dashboard.html";
    });
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
