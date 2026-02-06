const quizData = [
    {
        question: "Was ist die Hauptstadt von Deutschland?",
        answers: ["Berlin", "Hamburg", "München", "Köln"],
        correct: 0
    },
    {
        question: "Welche Farbe hat der Himmel?",
        answers: ["Grün", "Blau", "Rot", "Gelb"],
        correct: 1
    },
    {
        question:"Wie viele Kontinente gibt es?",
        answers: ["5","6","7","8"],
        correct: 2
    },
    {
        question:"Welches Tier ist das größte Landsäugetier?",
        answers:["Giraffe", "Nashorn", "Elefant","Nilpferd"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = quizData[currentQuestion];
    const quizDiv = document.getElementById("quiz");
    const progress = ((currentQuestion) / quizData.length) * 100;

    let html = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="progress">Frage ${currentQuestion+1} von ${quizData.length}</div>
            <h2>${question.question}</h2>
            
    `;

    question.answers.forEach((answer, index) => {
        html += `
             <button class="answer-btn" onclick="checkAnswer(${index})">
               ${answer}
              </button>
        `;
     
    });
    quizDiv.innerHTML=html;
}

function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');

    //Buttons deaktivieren
    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === question.correct) {
        score++;
        buttons[selectedIndex].classList.add('correct');
    }else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;

    if (currentQuestion <quizData.length) {
        showQuestion();
    }else {
        showResult();
    }
    }, 900);
}

function showResult(){
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = `
                        <h2>Quiz Beendet!😎</h2>
                        <p>Du hast ${score} von ${quizData.length} Punkten erreicht.</p>
                        <button onclick = "restartQuiz()">Nochmal spielen</button>
    `;

}

function restartQuiz(){
    currentQuestion = 0;
    score = 0;
    showQuestion();
}
showQuestion();