window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 2000);
});

const faqHeading = document.querySelector('.FAQ');
const faqHeading2 = document.querySelector('.FAQ-h2');

faqHeading.addEventListener('mouseenter', function () {
    faqHeading2.style.display = "block";
});

faqHeading.addEventListener('mouseleave', function () {
    faqHeading2.style.display = "none";
})