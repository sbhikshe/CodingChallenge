/* Intro to the quiz, start button, timer display */
var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");
var timerEl = document.querySelector("#time-remaining");
var qaEl = document.querySelector("#qaSection");

/* Q&A display */
var questionEl;
var answerListUl;
var answersLi = [];
var nextButtonEl;
var responseToUserEl;

/* Scores display */
var resultsCaptionEl;
var scoreEl;
var initialsDivEl;
var enterInitialsEl;
var initialsEl;
var submitButtonEl;

/* High scores display */
var highScoresCaptionEl;
var highScoresListOl;
var highScoresLi = []; /* append initials + score and display as a single string li */
var goBackButtonEl;
var clearHighScoresButtonEl;
var score = 0; 

/* Questions, answer choices, correct answer */
var quizTime = 100;
var qa1 = {
    question: "The header tag appears in which portion of the HTML document?",
    choices: ["meta", "body", "div", "footer"],
    answer: "body"
};

var qa2 = {
    question: "The CSS stylesheet is linked to the HTML document using the ________ tag.",
    choices: ["a href", "style", "link", "src"],
    answer: "link"
};

var qa3 = {
    question: "An array in Javascript can contain items of type _________ .",
    choices: ["all numbers", "all strings", "all objects", "any combination of types"],
    answer: "any combination of types"
};

var qaList = [qa1, qa2, qa3];                
var showNext = true;
var currentQuestion;
var nextQuestion = 0;
var skipToNext = true; /* did the user skip to the next question without picking an answer */

function runQuiz(event) {

    /* we use the following conditions to run this quiz / display questions */
    /* nextquestion - index of the next question to be displayed */
    /*              - used with qalist.length to check for complete */
    /*              if 0, we need to display the first question, so set up the DOM */
    /*              if > 0 but < max, check showNext */
    /*              if == max, check showNext */
    /*              if > max, done */
    /* showNext     - if false, we are waiting for the user to respond */
    /*              - if true, we are ready to show the next question */
    
    if (nextQuestion < qaList.length) {
        if(showNext == true) {
            /* setup DOM if required, and display the next question */
            displayQuestion();
            showNext = false;
            return "new";
        } else {
            console.log("Waiting for user to respond");
            return "same";
        }
    } else if (nextQuestion == qaList.length) {
        if (showNext == true) {
            /* shown all the questions, user has responded */
            console.log("No more to show, return none");
            return "none";
        } else {
            console.log("waiting for user to respond to last question");
            return "same"
        }
    }
}

function displayQuestion() {
    /* get the first or next qa object from the qaList */
    currentQuestion = qaList[nextQuestion];

    /* if this is the first question, create the ul/li elements */
    /* to show the question and answers */
    /* else elements are already set up, skip this. */
    if(nextQuestion === 0) {
        setupQaDisplay();
    }

    /* set the question and choices to the ul and li */
    questionEl.textContent = currentQuestion.question;
    for (var i = 0; i < 4; i++) {
        answersLi[i].textContent = currentQuestion.choices[i];
    }
    responseToUserEl.textContent = "";
    answerListUl.addEventListener("click", checkAnswer);
}

function setupQaDisplay() {
    /* for the question */
    questionEl = document.createElement("p");
    qaEl.appendChild(questionEl);

    /* The list of choices for the answer */
    answerListUl = document.createElement("ol");
    qaEl.appendChild(answerListUl);

    for (var i = 0; i < 4; i++) {
        answersLi[i] = document.createElement("li");
        answerListUl.appendChild(answersLi[i]);
        answersLi[i].setAttribute("style", "background-color: lightblue; width: 200px; padding: 10px; margin: 5px;");
        answersLi[i].addEventListener("mouseenter", function(event) {
            var item = event.target;
            item.setAttribute("style", "background-color: lightgrey; width: 200px; padding: 10px; margin: 5px;");

        });
        answersLi[i].addEventListener("mouseleave", function(event) {
            var item = event.target;
            item.setAttribute("style", "background-color: lightblue; width: 200px; padding: 10px; margin: 5px;");

        });
    }

    /* add the next button */
    nextButtonEl = document.createElement("button");
    nextButtonEl.textContent = "Next";
    nextButtonEl.setAttribute("style", "padding: 5px; margin: 10px;")
    qaEl.appendChild(nextButtonEl);
    nextButtonEl.addEventListener("click", handleNextButton);

    /* add this element to display correct / wrong when the answer is checked */
    responseToUserEl = document.createElement("p");
    responseToUserEl.textContent = "";
    responseToUserEl.setAttribute("style", "font-size: 150%; padding: 5px; margin-left: 20px;")
    qaEl.appendChild(responseToUserEl);
}

function handleNextButton() {
    if(skipToNext === true) {
        /* user didn't answer the question, skipping to the next question */
        /* negative points! */
        console.log("user didn't answer the question, negative points");
        quizTime -= 10;
    } else {
        console.log("user answered this Q, reset skipToNext");
        skipToNext = true;
    }
    /* user clicked next, show the next question */
    showNext = true;
    nextQuestion++;
}

function checkAnswer(event) {
    console.log("In check answer: ", event);
    /* user clicked on a choice, didn't skip */
    skipToNext = false; 
    /* check the answer */
    /* show correct / wrong */
    console.log("event.target" + event.target);
    console.log("event.target.textContent: " + event.target.textContent);

    if(event.target.textContent === currentQuestion.answer ) {
        console.log("Correct answer");
        responseToUserEl.textContent = "Correct!"
        score++;
    } else {
        console.log("Wrong answer");
        responseToUserEl.textContent = "Wrong!"
        /* decrement time, this affects the game score is the time */
        /* value when we are done (if timeout, score = 0), else *
        /* score = timer value */
        quizTime -= 10; /* knock down by 10 seconds */
    }
    answerListUl.removeEventListener("click", checkAnswer);
}

function displayScores() {
    /* clear the page, remove all the qa elements */
    qaEl.removeChild(questionEl);
    qaEl.removeChild(answerListUl);
    for (var i = 0; i < 4; i++) {
        answerListUl.removeChild(answersLi[i]);
    }
    qaEl.removeChild(nextButtonEl);
    qaEl.removeChild(responseToUserEl);

    /* show the scores */
    resultsCaptionEl = document.createElement("h2");
    resultsCaptionEl.textContent = "All Done!"
    resultsCaptionEl.setAttribute("style", "font-weight: bold; padding: 5px; margin-left: 10px;");
    qaEl.appendChild(resultsCaptionEl);

    scoreEl = document.createElement("h4");
    scoreEl.textContent = "Your score is: " + quizTime;
    scoreEl.setAttribute("style", "font-weight: bold; padding: 5px; margin: 10px;");
    qaEl.appendChild(scoreEl);  

    /* This <div> contains "Enter Initials: <input box> Submit button " */
    initialsDivEl = document.createElement("div");
    qaEl.appendChild(initialsDivEl);

    enterInitialsEl = document.createElement("label");
    enterInitialsEl.textContent = "Enter Initials:";
    enterInitialsEl.setAttribute("style", "font-weight: bold; padding: 5px; margin-left: 10px; margin-top: 10px;");
    initialsDivEl.appendChild(enterInitialsEl);

    initialsEl = document.createElement("textarea");
    initialsEl.setAttribute("style", "margin-left: 10px; margin-top: 10px; text-transform: uppercase;");
    initialsEl.rows = "1";
    initialsEl.cols = "10";
    initialsDivEl.appendChild(initialsEl);

    submitButtonEl = document.createElement("button");
    submitButtonEl.textContent = "Submit";
    submitButtonEl.setAttribute("style", "padding: 5px; margin-left: 10px;");
    initialsDivEl.appendChild(submitButtonEl);

    /* when the user clicks Submit, store to local storage */
    submitButtonEl.addEventListener("click", handleScoreSubmit);
    
}

function handleScoreSubmit() {

    /* store the initials and the score to local storage */
    localStorage.setItem("score", initialsEl.value.toUpperCase() + " " + quizTime);

    /* clear the display scores */
    qaEl.removeChild(resultsCaptionEl);
    qaEl.removeChild(scoreEl);
    qaEl.removeChild(initialsDivEl);
    initialsDivEl.removeChild(enterInitialsEl);
    initialsDivEl.removeChild(initialsEl);
    initialsDivEl.removeChild(submitButtonEl);

    /* and display the High Scores with option to "Go back" or "Clear high scores" */
    highScoresCaptionEl = document.createElement("h2");
    highScoresCaptionEl.textContent = "High Scores";
    highScoresCaptionEl.setAttribute("style", "font-weight: bold; padding: 5px; margin-left: 10px;");
    qaEl.appendChild(highScoresCaptionEl);

    highScoresListOl = document.createElement("ol");
    qaEl.appendChild(highScoresListOl);

    /* for now, storing only one score */
    highScoresLi[0] = document.createElement("li");
    highScoresLi[0].textContent = localStorage.getItem("score");
    highScoresListOl.appendChild(highScoresLi[0]);

    /* add the Go Back button */
    goBackButtonEl = document.createElement("button");
    goBackButtonEl.textContent = "Go Back";
    goBackButtonEl.setAttribute("style", "margin-left: 10px; margin-bottom: 10px");
    goBackButtonEl.addEventListener('click', goBackToStart);
    qaEl.appendChild(goBackButtonEl);

    /* add the Clear High Scores button */
    clearHighScoresButtonEl = document.createElement("button");
    clearHighScoresButtonEl.textContent = "Clear High scores";
    clearHighScoresButtonEl.setAttribute("style", "margin-left: 20px; margin-bottom: 10px");
    clearHighScoresButtonEl.addEventListener('click', clearScores);
    qaEl.appendChild(clearHighScoresButtonEl);

}

function clearScores() {
    localStorage.removeItem("score");
    highScoresListOl.removeChild(highScoresLi[0]);
}

function goBackToStart() {
    /* clear the high scores display */
    qaEl.removeChild(highScoresCaptionEl);
    qaEl.removeChild(highScoresListOl);
    qaEl.removeChild(goBackButtonEl);
    qaEl.removeChild(clearHighScoresButtonEl);

    /* return to start */
    quizTime = 100;
    timerEl.textContent = quizTime;
    introEl.setAttribute("style", "visibility: visible;");
    startButtonEl.setAttribute("style", "visibility: visible;");
    showNext = true;
    nextQuestion = 0;
}

function startQuiz() {

    /* Hide the intro to the game and the Start button */
    introEl.setAttribute("style", "visibility: hidden;");
    startButtonEl.setAttribute("style", "visibility: hidden;");

    var timerId = setInterval(function() {
        quizTime--;
        timerEl.textContent = quizTime;

        /* if out of time, stop timer and show the score */
        /* else, display the next questions */
        /* quizTime can also be < 0, since the user loses points (-10) */
        /* if they skip a question without answering */
        if (quizTime <= 0) {
            clearInterval(timerId);
            displayScores();
        } else {
            var isQuestionDisplayed = runQuiz();
            if ( isQuestionDisplayed === "new") {
                /* add the next button listener */
                console.log("new question displayed, wait for answer");
            } else if (isQuestionDisplayed === "same") {
                console.log("Continue to display same question, Waiting for user to respond");
            } else if (isQuestionDisplayed === "none") {
                /* done with the questions, and we are still in the timer */
                /* stop the timer */
                console.log("all qs done, stopping the timer, showing scores")
                clearInterval(timerId);
                displayScores();
            }
        }
    }, 1000);
}

startButtonEl.addEventListener("click", startQuiz);
