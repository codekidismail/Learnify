window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 2000);
});

const items = document.querySelectorAll('.announce-item');
let activeImg = null;
let activeItem = null;
let animationFrame = null;

function updatePosition() {
    if (!activeImg || !activeItem) return;

    const rect = activeItem.getBoundingClientRect();
    const parentRect = document.querySelector(".popup-holder").getBoundingClientRect();

    activeImg.style.left =
        (rect.left - parentRect.left + rect.width / 2 - activeImg.offsetWidth / 2) + "px";

    activeImg.style.top = parentRect.top + 5 + "px";

    animationFrame = requestAnimationFrame(updatePosition);
}

items.forEach(item => {
    const img = document.getElementById(item.dataset.img);

    item.addEventListener("mouseenter", () => {
        activeImg = img;
        activeItem = item;

        img.style.display = "block";
        img.style.pointerEvents = "none";

        updatePosition();
    });

    item.addEventListener("mouseleave", () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);

        img.style.display = "none";
        activeImg = null;
        activeItem = null;
    });
});
