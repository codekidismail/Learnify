const correctAnswers = {
    q1: "Observing, experimenting, and explaining",
    q2: "Grounded knowledge and soaring ideas",
    q3: "See tiny living organisms invisible to the naked eye",
    q4: "Robert Hooke",
    q5: "Antonie van Leeuwenhoek",
    q6: "False",
    q7: "True",
    q8: "True",
    q9: "False",
    q10: "True",
    q11: "curious",
    q12: "lens",
    q13: "cell wall",
    q14: "unicellular organisms",
    q15: "communicable diseases"
};

let score = 0;

const quizAudio = document.getElementById("quizTime");

quizAudio.play().catch(err => console.log("Audio blocked:", err));

document.querySelector(".submit-btn").addEventListener("click", (e) => {
    e.preventDefault();

    let score = 0;

    for (let q in correctAnswers) {
        let correct = correctAnswers[q].toLowerCase().trim();

        let selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value.toLowerCase().trim() === correct) {
            score++;
        }

        let textInput = document.querySelector(`input[type="text"][name="${q}"]`);
        if (textInput && textInput.value.toLowerCase().trim() === correct) {
            score++;
        }
    }

    if (!quizAudio.paused) {
        quizAudio.pause();
        quizAudio.currentTime = 0; 
    }

    const alertSound = document.getElementById("alertSound");
    if (alertSound) {
        alertSound.currentTime = 0; 
        alertSound.play();
    }

    setTimeout(() => {
        alert(`Your score: ${score} / 15`);
        localStorage.setItem("scienceScore", score);
        document.querySelector(".science-quiz").reset();
        window.location.href = "quiz.html";
    }, 150); 
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
