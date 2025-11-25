localStorage.removeItem("mathQuizEndTime");

const correctAnswers = {
    q1: "Square lockers",
    q2: "Square numbers",
    q3: "72",
    q4: "An odd number",
    q5: "1.024 cm",
    q6: "False",
    q7: "True",
    q8: "True",
    q9: "False",
    q10: "False",
    q11: "factors",
    q12: "perfect squares",
    q13: "10",
    q14: "cube",
    q15: "Fibonacci"
};

const form = document.querySelector(".mathematics-quiz");
const alertSound = document.getElementById("alertSound");
const quizAudio = document.getElementById("quizTime");

quizAudio.play().catch(() => {
    console.log("Audio autoplay blocked — will play after user interacts.");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let score = 0;

    for (let q in correctAnswers) {
        const correct = correctAnswers[q].toLowerCase().trim();
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const textInput = document.querySelector(`input[type="text"][name="${q}"]`);

        if (
            (selected && selected.value.toLowerCase().trim() === correct) ||
            (textInput && textInput.value.toLowerCase().trim() === correct)
        ) {
            score++;
        }
    }

    localStorage.setItem("mathsScore", score);

    localStorage.removeItem("mathQuizEndTime");

    if (!quizAudio.paused) {
        quizAudio.pause();
        quizAudio.currentTime = 0;
    }

    alertSound.currentTime = 0;
    alertSound.play().catch(() => {});

    setTimeout(() => {
        alert(`Your score: ${score} / 15`);
        window.location.href = "quiz.html";
    }, 300);
});


let examDuration = 30;
let endTime = Date.now() + examDuration * 60 * 1000;
localStorage.setItem("mathQuizEndTime", endTime);

let timerInterval = setInterval(() => {
    let remaining = endTime - Date.now();

    if (remaining <= 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").textContent = "00:00";
        alertSound.play().catch(() => {});
        form.submit();
        return;
    }

    let minutes = Math.floor(remaining / 60000);
    let seconds = Math.floor((remaining % 60000) / 1000);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").textContent = `${minutes}:${seconds}`;

}, 1000);

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);
    }, 2000);
});















