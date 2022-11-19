// timer variables
var time = document.querySelector(".timer");
var scores = document.querySelector("#scores");
var timeLeft = 60;
var score = timeLeft;


// let questionEl = document.querySelector("#question");
// const correctIncorrect = document.querySelector("#correct-incorrect");
// let questionNumber = 0;

// //FINAL SCORE VARIABLES
const finalEl = document.querySelector("#final-score");
let InitialsInput = document.querySelector("#initials");

// // //HIGH SCORES
const highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
//const quizendContainerElement =document.getElementById('quiz-end-container')
let shuffledQuestions, currentQuestionIndex


let viewScoreBtn = document.querySelector("#view-scores")
viewScoreBtn.classList.add('hide');
viewScoreBtn.addEventListener('click', viewHighScores)
const quizend = document.querySelector('quiz-end-container')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    //quizendContainerElement.classList.add('hide')
    nextButton.classList.remove('hide')
    setNextQuestion()
    Timer();

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])


}
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        console.log(typeof answer.correct);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function selectAnswer(e) {
    const selectedButton = e.target
    console.log(selectedButton);
    const correct = selectedButton.dataset.correct
    if (!correct) {
        timeLeft = timeLeft - 10;
    }
    console.log('timer check');
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {

        nextButton.classList.remove('hide')
    } else {
        //view scores not sure how to get the list to populate
        // quizend.classList.remove('hide')
        viewScoreBtn.innerText = "View Scores"
        viewScoreBtn.classList.remove('hide')
        console.log("text");

    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        //timeLeft = timeLeft - 10;

    }
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


//ANSWER BUTTONS

// const answerbtn = document.querySelectorAll("button.answer-btn");

let submitScoreBtn = document.querySelector("#Submit-Selections");
let clearScoreBtn = document.querySelector("#eraseScores");
//viewScoreBtn = document.querySelector("#view-scores");
 let goBackBtn = document.querySelector('#Back-Button');


// // QUESTIONS ARRAY
const questions = [
    {
        question: "Commonly used data type DO NOT INCLUDE:",
        answers: [
            { text: "1. strings", correct: false },
            { text: "2. booleans", correct: true },
            { text: "3. alerts", correct: false },
            { text: "4. numbers", correct: false }
        ],
        //correctAnswer: "2"
    },
    {
        question: "The condition in an if/else statement is enclosed within ________.",
        answers: [
            { text: "1. quotes", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. parenthesis", correct: true },
            { text: "4. square brackets", correct: false }
        ]
        // correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false },
            { text: "2. curly brackets", correct: false },
            { text: "3. quotes", correct: true },
            { text: "4. parenthesis", correct: false }
        ]
        //correctAnswer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answers: [
            { text: "1. numbers and strings", correct: false },
            { text: "2. other arrays", correct: false },
            { text: "3. booleans", correct: false },
            { text: "4. all of the above", correct: true }
        ]
        //correctAnswer: "4"
    },
    {
        question: " A very useful tool used during development and debugging for printing contenet to the debugger is:",
        answers: [
            { text: "1. Javascript", correct: false },
            { text: "2. terminal/bash", correct: false },
            { text: "3. for loops", correct: false },
            { text: "4. console.log", correct: true }
        ]
        //correctAnswer: "4"
    }
];

// //TIMER

function Timer() {
    let timerInterval = setInterval(function () {
        timeLeft--;
        time.textContent = `Time:${timeLeft}s`;

        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            questionElement.style.display = "hide";
            finalEl.style.display = "block";
            score.textContent = timeLeft;
        }
    }, 1000);
}

function viewHighScores() {
    console.log('view high scores');


}

// //START QUIZ

// function startQuiz(){
//     Intro.style.display = "none";
//     questionsEl.style.display ="block";
//     questionNumber= 0;

//     Timer();
//     setQuestion(questionNumber);  
// }
// function setQuestion(id) {
//     if (id < questions.length) {
//         questionsEl.textContent = questions[id].question;
//         answer1Btn.textContent = questions[id].answers[0];
//         answer2Btn.textContent = questions[id].answers[1];
//         answer3Btn.textContent = questions[id].answers[2];
//         answer4Btn.textContent = questions[id].answers[3];
//     }
// }
//  //CHECK ANSWERS
//  function checkAnswer(event) {
//     event.preventDefault();

//     correctIncorrect.style.display = "block";
//     let p = document.createElement("p");
//     correctIncorrect.appendChild(p);

//     setTimeout(function(){
//         p.style.display = 'none';
//     }, 1000);

//     //CONDITIONALS

//     if (questions[questionNumber].correctAnswer === event.target.value){
//         p.textContent = "CORRECT!";
//     }
//     else if (questions[questionNumber].correctAnswer !== event.target.value) {
//         timeLeft = timeLeft - 10;
//         p.textContent = "WRONG!";
//     }
//     if (questionNumber< questions.length) {
//         questionNumber++;
//     }
//     setQuestion(questionNumber);
//  }

// THIS FUNCTION ADDS THE SCORE TO THE LIST OF HIGH SCORES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function addScore(event) {
    event.preventDefault();

    finalEl.style.display = 'none';
    highscoresEl.style.display = "block";
    let initl = InitialsInput.value.toUpperCase();
    scoreList.push({ initials: initl, score: timeLeft });

    //   //HIGH SCORE LIST

    scoreList = scoreList.sort((a, b) => {
        if (a.score > b.score) {
            return 1;
        } else {
            return -1;
        }
    }); scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }
    storeGrades();
    displayGrades();
}


function storeGrades() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}


function displayGrades() {
    let storedGradeList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedGradeList !== null) {
        scoreList = storedGradeList;
    }
}

  function clearGrade() {
   localStorage.clear();
    scoreListEl.innerHTML="";
 }


//  start.addEventListener("click", startQuiz);
//  answerbtn.forEach(item=>{
//     item.addEventListener('click', checkAnswer);
//  });

//  //SCORE EVENT

//  submitScoreBtn.addEventListener('click', addScore);
//  goBackBtn.addEventListener('click', function() {
//     highscoresEl.style.display='none';
//     Intro.style.display ="block";
//     timeLeft= 60;
//     time.textContent='Time:${timeLeft}s';
//  });


//  clearScoreBtn.addEventListener('click', clearGrade);
//  viewScoreBtn.addEventListener("click", function () {
//     if (highscoresEl.style.display === "none"){
//         highscoresEl.style.display = "block";
//     }
//     else if (highscoresEl.style.display === "block"){
//         highscoresEl.style.display = "none";
//     }
//     else {
//         return alert ("Hey! Take the Quiz. There is no Highscore");
//     }
//  });


