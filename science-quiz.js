/* ---------------------------------------------------
   FIXED & CLEAN SCIENCE QUIZ SCRIPT
--------------------------------------------------- */

// Always reset timer when user reopens the page
window.addEventListener("pageshow", () => {
    localStorage.removeItem("scienceQuizEndTime");
});

// Elements
const container = document.querySelector(".container") || document.body;
let timerBox = document.getElementById("timerBox");
if (!timerBox) {
    timerBox = document.createElement("div");
    timerBox.id = "timerBox";
    timerBox.innerHTML = `Time Left: <span id="timer">00:00</span>`;
    container.prepend(timerBox);
}

const timerEl = document.getElementById("timer");
const form = document.querySelector(".science-quiz");
const submitBtn = document.querySelector(".submit-btn");
const alertSound = document.getElementById("alertSound");
const quizAudio = document.getElementById("quizTime");

// Correct Answers
const correctAnswers = {
    q1: "observing, experimenting, and explaining",
    q2: "grounded knowledge and soaring ideas",
    q3: "see tiny living organisms invisible to the naked eye",
    q4: "robert hooke",
    q5: "antonie van leeuwenhoek",
    q6: "false",
    q7: "true",
    q8: "true",
    q9: "false",
    q10: "true",
    q11: "curious",
    q12: "lens",
    q13: "cell wall",
    q14: "unicellular organisms",
    q15: "communicable diseases"
};

// Audio autoplay protection
quizAudio.play().catch(() => {});

// Loader
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => loader.classList.add("hide"), 300);
        setTimeout(() => loader.style.display = "none", 1100);
    }
});

/* ---------------------------------------------------
   TIMER SYSTEM
--------------------------------------------------- */
const STORAGE_KEY = "scienceQuizEndTime";
const SCORE_KEY = "scienceScore";
const examDuration = 30; // minutes

let endTime = Number(localStorage.getItem(STORAGE_KEY));

// Set new timer if none exists
if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + examDuration * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, endTime);
}

let timerInterval = setInterval(() => {
    let remaining = endTime - Date.now();

    if (remaining <= 0) {
        clearInterval(timerInterval);
        timerEl.textContent = "00:00";

        alertSound.play().catch(() => {});
        submitHandler(); // Auto submit
        return;
    }

    let minutes = Math.floor(remaining / 60000);
    let seconds = Math.floor((remaining % 60000) / 1000);
    if (seconds < 10) seconds = "0" + seconds;

    timerEl.textContent = `${minutes}:${seconds}`;

}, 1000);


/* ---------------------------------------------------
   SUBMIT HANDLER
--------------------------------------------------- */
function submitHandler(e) {
    if (e) e.preventDefault();

    let score = 0;

    for (let q in correctAnswers) {
        const correct = correctAnswers[q].toLowerCase().trim();

        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value.toLowerCase().trim() === correct) {
            score++;
        }

        const text = document.querySelector(`input[type="text"][name="${q}"]`);
        if (text && text.value.toLowerCase().trim() === correct) {
            score++;
        }
    }

    // Save score
    localStorage.setItem(SCORE_KEY, score);

    // Stop timer
    clearInterval(timerInterval);
    localStorage.removeItem(STORAGE_KEY);

    // Stop audio
    quizAudio.pause();
    quizAudio.currentTime = 0;

    alertSound.play().catch(() => {});

    // Show score first
    setTimeout(() => {
        alert(`Your score: ${score} / 15`);
        window.location.href = "quiz.html";
    }, 200);
}

// Attach event
submitBtn.addEventListener("click", submitHandler);

