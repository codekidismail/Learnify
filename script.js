document.addEventListener("DOMContentLoaded", () => {
    const mathBar = document.querySelector(".mathematics-prog-bar");
    const scienceBar = document.querySelector(".science-prog-bar");
    const socialBar = document.querySelector(".social-prog-bar");

    const mathProgress = parseInt(localStorage.getItem("mathProgress")) || 0;
    const scienceProgress = parseInt(localStorage.getItem("scienceProgress")) || 0;
    const socialProgress = parseInt(localStorage.getItem("socialProgress")) || 0;

    if (mathBar) mathBar.style.width = mathProgress + "%";
    if (scienceBar) scienceBar.style.width = scienceProgress + "%";
    if (socialBar) socialBar.style.width = socialProgress + "%";
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
