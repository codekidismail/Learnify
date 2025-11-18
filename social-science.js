const completeButtons = document.querySelectorAll(".complete-topic-btn"); 
const alertSound = new Audio("audio/Alert.mp3"); // Make sure the path is correct

completeButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        const subject = this.getAttribute("data-subject");
        let currentProgress = parseInt(localStorage.getItem(subject + "Progress")) || 0;
        let newProgress = currentProgress + 25;
        if (newProgress > 100) newProgress = 100;

        localStorage.setItem(subject + "Progress", newProgress);
        localStorage.setItem("socialBadge", true);

        // Play sound first, then show alert
        alertSound.play().then(() => {
            alert(subject.toUpperCase() + " Topic completed! Your progress bar is now at " + newProgress + "%");
        }).catch((err) => {
            // Fallback if sound fails
            console.error("Audio playback failed:", err);
            alert(subject.toUpperCase() + " Topic completed! Your progress bar is now at " + newProgress + "%");
        });
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
