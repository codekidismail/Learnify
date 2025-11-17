const completeButtons = document.querySelectorAll(".complete-topic-btn");

completeButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        const subject = this.getAttribute("data-subject");
        let currentProgress = parseInt(localStorage.getItem(subject + "Progress")) || 0;
        let newProgress = currentProgress + 25;
        if (newProgress > 100) newProgress = 100;

        localStorage.setItem(subject + "Progress", newProgress);
        localStorage.setItem("scienceBadge", true);

        // Play sound
        const alertSound = document.getElementById("alertSound");
        if (alertSound) {
            alertSound.currentTime = 0;
            alertSound.play().catch(err => console.log("Audio play error:", err));
        }

        // Delay the alert slightly to let the sound start
        setTimeout(() => {
            alert(subject.toUpperCase() + " Topic completed! Your progress bar is now at " + newProgress + "%");
        }, 200); // 200ms delay
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


