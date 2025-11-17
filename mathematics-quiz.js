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

quizAudio.play().catch(err => console.log("Audio blocked:", err));

form.addEventListener("submit", function(e) {
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

    if (!quizAudio.paused) {
        quizAudio.pause();
        quizAudio.currentTime = 0; 
    }

    if (alertSound) {
        alertSound.currentTime = 0;
        alertSound.play().catch(err => console.log("Audio blocked:", err));
    }

    setTimeout(() => {
        alert(`Your score: ${score} / 15`);
        window.location.href = "quiz.html";
    }, 300);
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








