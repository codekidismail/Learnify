const mathsMarksInput = document.querySelector(".maths-marks");
const scienceMarksInput = document.querySelector('.science-marks');
const socialScienceMarksInput = document.querySelector(".social-science-marks");
const mathsMarks = Number(localStorage.getItem("mathsScore"));
const scienceMarks = Number(localStorage.getItem("scienceScore"));
// const socialScienceMarks = Number(localStorage.getItem("socialScienceScore"));

mathsMarksInput.textContent = `${mathsMarks}/15`;
scienceMarksInput.textContent = `${scienceMarks}/15`;

window.addEventListener("load", function(){
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800); 
    }, 2000); 
});