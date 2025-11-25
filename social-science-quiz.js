if ("scrollRestoration" in history) history.scrollRestoration = "manual";

window.addEventListener("pageshow", () => {
    const end = Number(localStorage.getItem("socialScienceQuizEndTime"));

    if (!end || end < Date.now() || end - Date.now() < 60000) {
        const newEnd = Date.now() + examDuration * 60 * 1000; 
        localStorage.setItem("socialScienceQuizEndTime", newEnd);
    }
});

const container = document.querySelector(".container") || document.body;

let timerBox = document.getElementById("timerBox");
if (!timerBox) {
    timerBox = document.createElement("div");
    timerBox.id = "timerBox";
    timerBox.innerHTML = `Time Left: <span id="timer">00:00</span>`;
    container.insertBefore(timerBox, container.firstChild);
}

const timerEl = document.getElementById("timer");
const form = document.querySelector(".social-science-quiz");
const submitBtn = document.querySelector(".submit-btn");
const alertSound = document.getElementById("alertSound");
const quizAudio = document.getElementById("quizTime");

quizAudio && quizAudio.play().catch(() => {});

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
            setTimeout(() => loader.style.display = "none", 800);
        }, 200);
    }
});

const correctAnswers = {
    q1: "A period between ancient and modern ages",
    q2: "Mamluk",
    q3: "Muhammad bin Tughlaq",
    q4: "Konark Sun Temple",
    q5: "Karnataka",
    q6: "False",
    q7: "True",
    q8: "False",
    q9: "True",
    q10: "True",
    q11: "Sultan",
    q12: "Narasimhadeva I",
    q13: "Daulatabad",
    q14: "Swaraj",
    q15: "1657 CE"
};

const STORAGE_KEY = "socialScienceQuizEndTime";
let examDuration = 30;

let savedEnd = Number(localStorage.getItem(STORAGE_KEY));

if (!savedEnd || savedEnd < Date.now()) {
    const newEnd = Date.now() + examDuration * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, newEnd);
}

let warned5 = false;
let warned1 = false;

let timerInterval = setInterval(() => {
    const end = Number(localStorage.getItem(STORAGE_KEY));
    let remaining = end - Date.now();

    if (remaining <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = "00:00";

        alertSound && alertSound.play().catch(() => {});

        submitHandler();
        return;
    }

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const scrollY = window.scrollY;
    requestAnimationFrame(() => {
        timerEl.textContent = `${minutes}:${seconds}`;
        window.scrollTo(0, scrollY);
    });

    if (!warned5 && remaining <= 5 * 60000) {
        warned5 = true;
        alert("⚠️ 5 minutes left!");
    }

    if (!warned1 && remaining <= 1 * 60000) {
        warned1 = true;
        alert("⚠️ 1 minute left!");
    }
}, 1000);

function submitHandler(e) {
    if (e) e.preventDefault();

    let score = 0;

    for (let q in correctAnswers) {
        const correct = correctAnswers[q].toLowerCase().trim();

        let selected = document.querySelector(`input[type="radio"][name="${q}"]:checked`);
        if (selected && selected.value.toLowerCase().trim() === correct) {
            score++;
        }

let textInput = document.querySelector(`input[type="text"][name="${q}"]`);
if (textInput && textInput.value.trim().toLowerCase() === correct) {
    score++;
}

    }

    localStorage.setItem("socialScienceScore", score);
    localStorage.removeItem(STORAGE_KEY);
    clearInterval(timerInterval);

    if (quizAudio) {
        quizAudio.pause();
        quizAudio.currentTime = 0;
    }

    if (alertSound) {
        alertSound.currentTime = 0;
        alertSound.play().catch(() => {});
    }

    setTimeout(() => {
        alert(`Your score: ${score} / 15`);
        form && form.reset();
        window.location.href = "quiz.html";
    }, 250);
}

if (submitBtn) {
    submitBtn.addEventListener("click", submitHandler);
}


