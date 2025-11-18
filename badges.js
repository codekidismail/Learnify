const mathTopicBadge = localStorage.getItem("mathBadge");
const scienceTopicBadge = localStorage.getItem("scienceBadge");
const socialTopicBadge = localStorage.getItem("socialBadge");
const mathProgress = localStorage.getItem("mathProgress");
const scienceProgress = localStorage.getItem("scienceProgress");
const socialProgress = localStorage.getItem("socialProgress");
const mathScore = localStorage.getItem("mathsScore");
const scienceScore = localStorage.getItem("scienceScore");
const socialScore = localStorage.getItem("socialScienceScore");
const badgeSound = document.getElementById("badgeSound");

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 2000);
});

function showPopup(message, callback) {
    badgeSound.currentTime = 0;
    badgeSound.play().catch(err => console.log("Audio blocked:", err));

    const existingPopup = document.querySelector(".quiz-popup");
    if (existingPopup) existingPopup.remove();
    const popup = document.createElement("div");
    popup.className = "quiz-popup";
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button id="popupOk">OK</button>
        </div>
    `;

    document.body.appendChild(popup);

    const style = document.createElement("style");
    style.textContent = `
        .quiz-popup {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex; align-items: center; justify-content: center;
            z-index: 9999;
        }
        .popup-content {
            background: #fff;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .popup-content button {
            margin-top: 15px;
            padding: 8px 20px;
            border: none;
            background: #00C6FF;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .popup-content button:hover {
            background: #007BFF;
        }
    `;
    document.head.appendChild(style);

    document.getElementById("popupOk").addEventListener("click", () => {
        popup.remove();
        if (callback) callback();
    });
}

// Queue to store popup messages
const popupQueue = [];
let popupActive = false;

function queuePopup(message) {
    popupQueue.push(message);
    if (!popupActive) {
        showNextPopup();
    }
}

function showNextPopup() {
    if (popupQueue.length === 0) {
        popupActive = false;
        return;
    }

    popupActive = true;
    const message = popupQueue.shift();
    showPopup(message, () => {
        showNextPopup(); // When OK clicked, show next popup
    });
}

function showBadgePopupOnce(key, message) {
    if (!localStorage.getItem(key)) {
        queuePopup(message);
        localStorage.setItem(key, "shown");
    }
}

if (mathTopicBadge === "true") {
    document.querySelector(".topic-badge").innerHTML = "<img src='images/Topic-completed-badge.jpeg' alt='Topic completed'>"
    document.querySelector(".topic-badge-earned").innerHTML = "<p>Earned!</p>"
    showBadgePopupOnce("mathTopicBadgeShown", "Congrats! You achieved a badge!")
}
if (scienceTopicBadge === "true") {
    document.querySelector(".topic-badge").innerHTML = "<img src='images/Topic-completed-badge.jpeg' alt='Topic completed'>"
    document.querySelector(".topic-badge-earned").innerHTML = "<p>Earned!</p>"
    showBadgePopupOnce("scienceTopicBadgeShown", "Congrats! You achieved a badge!")
}
if (socialTopicBadge === "true") {
    document.querySelector(".topic-badge").innerHTML = "<img src='images/Topic-completed-badge.jpeg' alt='Topic completed'>"
    document.querySelector(".topic-badge-earned").innerHTML = "<p>Earned!</p>"
    showBadgePopupOnce("socialTopicBadgeShown", "Congrats! You achieved a badge!")
}

if (mathProgress === "100" || socialProgress === "100" || scienceProgress === "100") {
    document.querySelector(".course-badge").innerHTML = "<img src='images/Course-completed-badge.jpeg' alt='Course completed'>"
    document.querySelector(".course-badge-earned").innerHTML = "<p>Earned!</p>"
    showBadgePopupOnce("courseCompleteBadgeShown", "Congrats! You achieved a badge!")
}

if (Number(mathScore) === 15 || Number(socialScore) === 15 || Number(scienceScore) === 15) {
    document.querySelector(".test-badge").innerHTML = "<img src='images/Quiz-badge.jpeg' alt='Quiz Full Marks Achieved'>"
    document.querySelector(".test-badge-earned").innerHTML = "<p>Earned!</p>"
    showBadgePopupOnce("testFullBadgeShown", "Congrats! You achieved a badge!")
}
