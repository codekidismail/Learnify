window.addEventListener("load", function(){
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800); 
    }, 2000); 
});

const items = document.querySelectorAll('.announce-item');

items.forEach(item => {
    const img = document.getElementById(item.dataset.img);
    item.addEventListener('mouseenter', () => {
        const rect = item.getBoundingClientRect();
        img.style.left = rect.left + rect.width / 2 + "px";
        img.style.top = rect.bottom + 5 + "px";
        img.style.display = "block";
    });
    item.addEventListener('mouseleave', () => {
        img.style.display = "none";
    });
})