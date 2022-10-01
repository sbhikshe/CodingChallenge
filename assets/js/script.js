var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");
var timerEl = document.querySelector("#time-remaining");
var qaEl = document.querySelector("#qaSection");

var questionEl;
var answerListUl;
var answersLi = [];
var nextButtonEl;
var responseToUserEl;


var quizTime = 60;
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
var nextQuestion = 0;
var showNext = true;

function displayQuestion() {

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
        var qa = qaList[nextQuestion];

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
        questionEl.textContent = qa.question;
        for (var i = 0; i < 4; i++) {
            answersLi[i].textContent = qa.choices[i];
        }

        /* don't show the next until the user has answered this one*/
        /* showNext should be set to true in the Next button event listener */
        showNext = false; 
        /* increment nextQuestion to use the next time */
        nextQuestion++;
        return "new"; /* we have put out the next question */
    } else {
        console.log("showNext is not true, we are waiting for the user to answer");
        return "same";
    }   
}

function checkAnswer(event) {
    console.log("In check answer: ", event);
    /* check the answer */
    /* show correct / wrong */
    /* go to next question */
    showNext = true;

    displayQuestion();
}

function displayScores() {
    console.log("Need to show the score");
    /* show the scores */
    /* enable the start button again */
    startButtonEl.disabled = false;
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
                nextButtonEl.addEventListener("click", checkAnswer);
            } else if (isQuestionDisplayed === "same") {
                console.log("Waiting for user to respond");
            } else if (isQuestionDisplayed === "none") {
                /* done with the questions, and we are still in the timer */
                /* stop the timer */
                clearInterval(timerId);
                displayScores();
            }
        }
    }, 1000);
}

startButtonEl.addEventListener("click", startQuiz);

