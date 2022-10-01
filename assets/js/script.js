var startButtonEl = document.querySelector("#startButton");
var introEl = document.querySelector("#intro");
var timerEl = document.querySelector("#time-remaining");
var qaEl = document.querySelector("#qaSection");

var questionEl;
var answerListUl;
var answersLi = [];
var nextButtonEl;


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

var qaList = [qa1, qa2];                
var nextQuestion = 0;
var showNext = true;

function displayQuestion() {

    /* we are done, no more Qs to show */
    if (nextQuestion >= qaList.length) {
        console.log("No more questions to show");
        return false;
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
            }
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
        return true; /* we have put out the next question */
    } else {
        console.log("showNext is not true, we are waiting for the user to answer");
    }   
}

function checkAnswer(event) {
    console.log("In check answer: ", event);
    /*check the answer */
    /* show correct / wrong */
    /* go to next question */
    showNext = true;
    displayQuestion();
}

function displayScores() {
    console.log("Need to show the score");
}

function startQuiz() {

    /* Remove intro to the game */
    introEl.children[0].textContent = "";

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
            if (displayQuestion()) {
                /* add the next button */
                nextButtonEl = document.createElement("button");
                nextButtonEl.textContent = "Next";
                qaEl.appendChild(nextButtonEl);
                nextButtonEl.addEventListener("click", checkAnswer);
            } else {
                /* done with the questions, and we are still in the timer */
                /* stop the timer */
                clearInterval(timerId);
                displayScores();
            }
        }
    }, 1000);
}

startButtonEl.addEventListener("click", startQuiz);

