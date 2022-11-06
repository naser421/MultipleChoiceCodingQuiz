// timer variables
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var timeLeft= 60;

//Button variables
const start = document.querySelector("#start");
const Intro = document.querySelector("#quiz-start");
const questionsEl= document.querySelector(".total-questions");

let questionsEl = document.querySelector("#question");
const correctIncorrect = document.querySelector("#correct-incorrect");
let questionNumber = 0;

//FINAL SCORE VARIABLES
const finalEl = document.querySelector("#final-score");
let InitialsInput = document.querySelector("#initials");

//HIGH SCORES
const highscoresEl = document.querySelector("#high-scores");
let scoresListEl= document.querySelector("#score-list");
let scoreList = [];

//ANSWER BUTTONS

const answerbtn = document.querySelectorAll("button.answer-btn");

let submitScoreBtn = document.querySelector("#Submit-Selections");
let clearScoreBtn = document.querySelector("#eraseScores");
let viewScoreBtn = document.querySelector("view-scores");
let goBackBtn = document.querySelector('#Back-Button');

// CALL ANSWER RESULTS
const answer1Btn = document.querySelector("#answer-1");
const answer2Btn = document.querySelector("#answer-2");
const answer3Btn = document.querySelector("#answer-3");
const answer4Btn = document.querySelector("#answer-4");

// QUESTIONS ARRAY
const questions = [
    {
    question1 : "Commonly used data type DO NOT INCLUDE:",
    answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    correctAnswer: "2"
    },
    {
    question2 : "The condition in an if/else statement is enclosed within ________.",
    answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
    correctAnswer: "3"
    },
    {
        question3: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1. commas","2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer : "3"
    },
    {
        question4: "Arrays in JavaScript can be used to store _______.",
        answers: [ "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4"
    },
    {
        question5: " A very useful tool used during development and debugging for printing contenet to the debugger is:",
        answers: [ "1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4"
    }
];

//TIMER

function Timer() {
    let timerInterval = setInterval(function(){
        secondsLeft--;
        time.textContent = 'Time:${secondsLeft}s';

        if (secondsLeft=== 0 || questionCount===questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display= "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

//START QUIZ

function.startQuiz(){
    codeIntro.style.display = "none";
    questionsEl.style.display ="block";
    questionCount= 0;

    Timer();
    setQuestion(questionCount);  
}
function setQuestion(id) {
    if (id < questions.length) {
        questionsEl.textContent = questions[id].question;
        answer1Btn.textContent = questions[id].answers[0];
        answer2Btn.textContent = questions[id].answers[1];
        answer3Btn.textContent = questions[id].answers[2];
        answer4Btn.textContent = questions[id].answers[3];
    }
}
 //CHECK ANSWERS

 function checkAnswer(event) {
    event.preventDefault();

    correctIncorrect.style.display = "block";
    let p = document.createElement("p");
    correctIncorrect.appendChild(p);

    setTimeout(function(){
        p.style.display = 'none';
    }, 1000);

    //CONDITIONALS

    if (questions[questionCount].correctAnswer === event.target.value){
        p.textContent = "CORRECT!";
    }
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "WRONG!";
    }
    if (questionCount< questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
 }

 
 function addScore(event) {
    event.preventDefault();

    finalEl.style.display ='none';
    highscoresEl.style.display = "block";

    let initl = InitialsInput.value.toUpperCase();
    scoreList.push({ initials : initl, score: secondsLeft});

    //HIGH SCORE LIST

    scoreList = scoreList.sort((a,b) => {
        if (a.score > b.score) {
            return 1;
        } else {
            return -1;
        }
    });
     scoresListEl.innerHTML="";
     for (let i=0; i<scoreList.length; i++){
        let li = document.createElement("li");
        li.textContent = '${scoreList[i].initials}: ${scoreList[i].score}';
        scoresListEl.append(li);
     }
     storeGrades();
     displayGrades();
 }


 function storeGrades() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
 }


 function displayGrade() {
    let storedGradeList = JSON.parse(localStorage.getItem("scoreList"));
    if(storedGradeList !== null) {
        scoreList = storedGradeList;
    }
 }

 function clearGrade() {
    localStorage.clear();
    scoresListEl.innerHTML="";
 }


 start.addEventListener("click", startQuiz);
 answerbtn.forEach(item=>{
    item.addEventListener('click'checkAnswer);
 });

 //SCORE EVENT

 submitScoreBtn.addEventListener('click', addScore);
 goBackBtn.addEventListener('click', function(){
    highscoresEl.style.display='none';
    Intro.style.display ="block";
    secondsLeft= 60;
    time.textContent='Time:${secondsLeft}s';
 });


 clearScoreBtn.addEventListener('click', clearGrade);
 viewScoreBtn.addEventListener("click", function() {
    if (highscoresEl.style.display === "none"){
        highscoresEl.style.display = "block";
    }
    else if (highscoresEl.style.display === "block"){
        highscoresEl.style.display = "none";
    }
    else {
        return alert ("Hey! Take the Quiz. There is no Highscore");
    }
 });


