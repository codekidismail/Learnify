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

const submitBtn = document.querySelector(".submit-btn");
const alertSound = new Audio("audio/Alert.mp3"); 
const quizAudio = document.getElementById("quizTime");

quizAudio.play().catch(err => console.log("Audio blocked:", err));

submitBtn.addEventListener("click", (e) => {
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

    alertSound.play().then(() => {
        alert(`Your score: ${score} / 15`);
        localStorage.setItem("socialScienceScore", score);

        const quizForm = document.querySelector(".social-science-quiz");
        if (quizForm) quizForm.reset();

        window.location.href = "quiz.html";
    }).catch((err) => {
        console.error("Audio playback failed:", err);
        alert(`Your score: ${score} / 15`);
        localStorage.setItem("socialScienceScore", score);
        const quizForm = document.querySelector(".social-science-quiz");
        if (quizForm) quizForm.reset();
        window.location.href = "quiz.html";
    });
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

