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

var score = 0; 

function displayQuestion(event) {

    /* If we came to this on the next button click, 
    we want to set the showNext to true to display 
    the next question. Else we don't know that the user 
    already responded and we've show correct / wrong. */
    if(event && event.target === nextButtonEl) {
        showNext = true;
    }
    /* we are done, no more Qs to show */
    if (nextQuestion >= qaList.length) {
        if(showNext === false) {
            /* we are waiting for the user to answer the last question */
            console.log("No more questions. Waiting for the last answer");
            return "same";
        } else {
            /* user has answered the last question, and there are no more */
            console.log("No more questions to show");
            return "none";
        }
    } else 
    if (showNext === true) {
        /* this is the first question or the user answered the current question */
        /* get the next qa object from the qaList */
        currentQuestion = qaList[nextQuestion];

        /* if this is the first question, create the ul/li elements to */
        /* to show the question and answers */
        if(nextQuestion === 0) {

            questionEl = document.createElement("p");
            qaEl.appendChild(questionEl);

            answerListUl = document.createElement("ol");
            qaEl.appendChild(answerListUl);

            for (var i = 0; i < 4; i++) {
                answersLi[i] = document.createElement("li");
                answerListUl.appendChild(answersLi[i]);
                answersLi[i].setAttribute("style", "background-color: lightblue; width: 200px; padding: 10px; margin: 5px;");
            }

            /* add the next button */
            nextButtonEl = document.createElement("button");
            nextButtonEl.textContent = "Next";
            nextButtonEl.setAttribute("style", "padding: 5px; margin: 10px;")
            qaEl.appendChild(nextButtonEl);

            responseToUserEl = document.createElement("p");
            responseToUserEl.textContent = "";
            responseToUserEl.setAttribute("style", "font-size: 150%; padding: 5px; margin-left: 20px;")
            qaEl.appendChild(responseToUserEl);
        }

        /* set the question and choices to the ul and li */
        questionEl.textContent = currentQuestion.question;
        for (var i = 0; i < 4; i++) {
            answersLi[i].textContent = currentQuestion.choices[i];
        }
        responseToUserEl.textContent = "";
        answerListUl.addEventListener("click", checkAnswer);

        /* don't show the next until the user has answered this one*/
        /* showNext should be set to true in the Next button event listener */
        showNext = false; 
        /* increment nextQuestion to use the next time */
        nextQuestion++;
        return "new"; /* we have put out the next question */
    } else {
        console.log("showNext is not true, waiting for the user to respond or click next");
        return "same";
    }   
}

function checkAnswer(event) {
    console.log("In check answer: ", event);
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
    console.log("Need to show the score");
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

    /* Enter initials + Submit */
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

    /* when you hit submit, stores to local storage */
    submitButtonEl.addEventListener("click", handleScoreSubmit);
    
    /* enable the start button again */
    startButtonEl.disabled = false;
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

    highScoresLi[0] = document.createElement("li");
    highScoresLi[0].textContent = localStorage.getItem("score");
    highScoresListOl.appendChild(highScoresLi[0]);

    goBackButtonEl = document.createElement("button");
    goBackButtonEl.textContent = "Go Back";
    goBackButtonEl.setAttribute("style", "margin-left: 10px; margin-bottom: 10px");
    goBackButtonEl.addEventListener('click', goBackToStart);
    qaEl.appendChild(goBackButtonEl);

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
    resetTime();
    introEl.children[0].textContent = "This is a timed multiple choice quiz with only one correct answer for each question. Good luck!";
    startButtonEl.disabled = false;
    showNext = true;
    nextQuestion = 0;
}

function resetTime() {
    quizTime = 100;
    timerEl.textContent = quizTime;
}

function startQuiz() {

    /* Remove intro to the game */
    introEl.children[0].textContent = "";
    startButtonEl.disabled = true;

       /* Start button: 1) remove 2) make it grey/ inactive */
    /* 3) change to 'stop' 4) change to 'restart' */
    // startButtonEl.textContent = "";

    var timerId = setInterval(function() {
        quizTime--;
        timerEl.textContent = quizTime;

        /* if out of time, stop timer */
        /* and show scores */
        /* else */
        /* display questions */
        if (quizTime === 0) {
            clearInterval(timerId);
            displayScores();
        } else {
            var isQuestionDisplayed = displayQuestion();
            if ( isQuestionDisplayed === "new") {
                /* add the next button listener */
                console.log("new question displayed, wait for answer");
                nextButtonEl.addEventListener("click", displayQuestion);
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

