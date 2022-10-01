startButtonEl = document.querySelector("#startButton");
introEl = document.querySelector("#intro");
timerEl = document.querySelector("#time-remaining");
qaEl = document.querySelector("#qaSection");

var quizTime = 60;
var qaList = ["The header tag appears in which portion of the HTML document?",
                "meta", "body", "div", "footer", "2"]; /* 2 - index of the right answer */
var nextQuestion = 0;
var showNext = true;


startButtonEl.addEventListener("click", function() {

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
        if ((showNext == true) && (nextQuestion < qaList.length)) {
        /* display questions */
        var question = document.createElement("p");
        question.textContent = qaList[nextQuestion];
        qaEl.appendChild(question);
        console.log(qaEl.children[0].textContent);

        var answerListUl = document.createElement("ul");
        qaEl.appendChild(answerListUl);

        var answersLi = [];

        for (var i = 0; i < 4; i++) {
            answersLi[i] = document.createElement("li");
            answersLi[i].textContent = qaList[i+1]; // 0th element is the question, asnwers start at 1st elt
            answerListUl.appendChild(answersLi[i]);
            answerListUl.appendChild(answersLi[i]);
        }
        var nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        //nextButton.setAttribute(); /// need to center button
        qaEl.appendChild(nextButton);

        showNext = false;
        nextQuestion++;

        } else {
            /* we are already showing the question */
            /* wait for answer (click) or timeout */
        }

    }, 1000);
});

