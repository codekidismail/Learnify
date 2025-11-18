const completeButtons = document.querySelectorAll(".complete-topic-btn");
const alertSound = document.getElementById("alertSound");

completeButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        const subject = this.getAttribute("data-subject");
        let currentProgress = parseInt(localStorage.getItem(subject + "Progress")) || 0;
        let newProgress = currentProgress + 25;
        if (newProgress > 100) newProgress = 100;

        localStorage.setItem("mathProgress", newProgress);
        localStorage.setItem("mathBadge", true);

        if (alertSound) {
            alertSound.currentTime = 0;
            alertSound.play();
        }

        setTimeout(() => {
            alert(`${subject.toUpperCase()} Topic completed! Your progress bar is now at ${newProgress}%`);
        }, 100); 
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

