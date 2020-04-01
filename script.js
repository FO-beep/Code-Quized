var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = 0;
var answer;


function startTimer() {
    
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');
    //This sets the timer 
    setTimer();
    // Inorder to display the questions, they have to be created first
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1500);
}

function makeQuestions() {
    
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
    questionNumber++;
}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
}

// Event Listeners for the Submit Button as well as the Start Button
startBtn.addEventListener("click", startTimer);

$(document).on("click", ".submitBtn",function(){
    event.preventDefault();
    addScore();
})


function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // Create a new object
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };

    $("#userName").val("")
    // document.getElementById("userName").value = ""
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    //Local Storage Push objects - highScores
    highScores.push(newScore)
    // Local Storage - Converting the objects into strings 
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}

function showFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pEl= document.getElementsByClassName("feedback")[0]
    
    // Validate/check User's inputs (feedback...)
    if (answer === event.target.textContent) {   
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1500);
        showFeedback();   
    } else {
        pEl.innerHTML = "Wrong X!";
        setTimeout(hideFeedback,1500);
        secondsLeft = secondsLeft - 15;
        showFeedback();
    }    
    makeQuestions();
});