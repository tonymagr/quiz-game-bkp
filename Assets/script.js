const viewHSLinkEl = document.querySelector("#view-HS-link");
const countDown = document.querySelector("#countdown");
const questionSection = document.querySelector("#question");
const multChoiceAnswers = document.querySelector("#mult-choice-answers");
const choiceResult = document.querySelector("#choice-result");

// Handles for dynamically created elements
let highScoreAnchor, quizHeader, instructions, startButton, 
    formHeading, initialsLabel, initialsInput, submitButton;
let multChoiceAns, highScoreEl;  //Tables of target handles
let timeInterval;  //Interval handle

// Misc variables, etc.
let score = 0, qIndex = 0, resultText = "", countDownMsg, secondsLeft = 30;
let highScores = [];
let highScore = {
    initials: null,
    score: null
}

// Var with array and object for questions 
const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },

    {
        title: "How do you call a function named myFunction?",
        choices: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
    },

    {
        title: "How does a for loop start?",
        choices: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", " for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i++)"
    },

    {
        title: "In JavaScript, which of the following is a logical operator?",
        choices: ["|", "&&", "%", "/"],
        answer: "&&" 
    },

    {
        title: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        choices: ["method", "assignment operator", "variable", "string"],
        answer: "variable"
    },

    {
        title: "Who invented JavaScript?",
        choices: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich"],
        answer: "Brendan Eich"
    },

    {
        title: "Which one of these is a JavaScript package manager?",
        choices: ["Node.js", "TypeScript", "npm"],
        answer: "npm"
    },

    {
        title: "Which tool can you use to ensure code quality?",
        choices: ["Angular", "jQuery", "RequireJS", "ESLint"],
        answer: "ESLint"
    },

    
    {
        title: "Which of the keyword is used to define the variable in the javascript?",
        choices: ["var", "let", "Both A & B", "None of the above"],
        answer: "Both A & B"
    },
    
    {
        title: "Which of the method is used to get HTML element in javascript?",
        choices: ["getElementbyId()", "getElementsByClassName()", "Both A & B", "None of the above"],
        answer: "Both A & B"
    },
    
    {
        title: "What does NaN mean?",
        choices: ["Negative Number", "Not a Number", "Both A & B", "None of the above"],
        answer: "Not a Number"
    },
    
    {
        title: "How do we put Javascript inside HTML?",
        choices: ["<js>", "<javascript>", "<scripting>", "<script>"],
        answer: "<script>"
    },
    
    {
        title: "Which of the following is not a javascript framework?",
        choices: ["Vue", "React", "Node", "Laravel"],
        answer: "Laravel"
    },
    
    {
        title: "The 'let' and 'var' are known as:",
        choices: ["Prototypes", "Declaration statements", "Data Types", "Keywords"],
        answer: "Declaration statements"
    },
    
    {
        title: "Which one is not a comparison operator?",
        choices: ["=", "<", ">", "!="],
        answer: "="
    },
    
    {
        title: "Which type of language is JavaScript?",
        choices: ["Object oriented", "Object based", "Functional", "None of the above"],
        answer: "Object based"
    }
  ];

function clearContent () {
    questionSection.innerHTML = "";
    multChoiceAnswers.innerHTML = "";
    choiceResult.innerHTML = "";
}

function countDownInterval () {
    timeInterval = setInterval(function () {
        if (secondsLeft === 0) {
            clearInterval(timeInterval);
            allDoneForm();
        } else {
            secondsLeft--
            countDownMsg = "Time: " + secondsLeft;
            countDown.innerHTML = countDownMsg;
        }
    },1000);
}

function startQuiz () {
    // Display counter
    let countDownMsg = "Time: " + secondsLeft;
    countDown.innerHTML = countDownMsg;
    
    // Clear section children elements
    clearContent();
    // Append startQuiz children
    // Question section
    quizHeader = document.createElement("h2");
    quizHeader.innerHTML = "Coding Quiz Challenge";
    quizHeader.style.textAlign = "center";
    questionSection.appendChild(quizHeader);
    questionSection.setAttribute("margin-left", "auto");
    questionSection.setAttribute("margin-right", "auto");

    instructions = document.createElement("p");
    instructions.innerHTML = "Try to answer the following code-related questions within the time limit.<br>"
                        + "Keep in mind that incorrect answers will penalize your score/time<br>"
                        + "by ten seconds!";
    instructions.style.textAlign = "center";
    questionSection.appendChild(instructions);
    
    // Multiple choice answers section - reused in this function only for Start button
    startButton = document.createElement("button");
    startButton.innerHTML = "Start Quiz";
    startButton.style.width = "100px";
    startButton.style.height = "50px";
    startButton.style.fontSize = "16px";
    startButton.style.color = "white";
    startButton.style.borderRadius = "10px";
    startButton.style.backgroundColor = "purple";
    startButton.setAttribute("data-index", 0);
    startButton.setAttribute("id","start-quiz");
    multChoiceAnswers.style.margin = "10px 500px 10px 650px";
    multChoiceAnswers.appendChild(startButton);
}

function renderChoiceResult () {
    // Render choice result section
    result = document.createElement("h3");
    result.style.color = "lightgray";
    result.style.fontStyle = "italic";
    result.innerHTML = resultText;
    choiceResult.appendChild(result);
}

function renderQuestionForm (qIndex) {
    console.log("Score: " + score);
    // Clear section children elements
    clearContent();

    // Render questionForm
    // Question section
    quizQuestion = document.createElement("h2");
    quizQuestion.innerHTML = questions[qIndex].title;
    questionSection.appendChild(quizQuestion);
        
    // Multiple choice answers section
    // Initialize
    multChoiceAns = [];
    
    for (let i = 0; i < questions[qIndex].choices.length; i++) {
        multChoiceAns[qIndex] = document.createElement("button");
        multChoiceAns[qIndex].innerHTML = questions[qIndex].choices[i];
        multChoiceAns[qIndex].style.width = "250px";
        multChoiceAns[qIndex].style.height = "80px";
        multChoiceAns[qIndex].style.fontSize = "16px";
        multChoiceAns[qIndex].style.margin = "5px";
        multChoiceAns[qIndex].style.color = "white";
        multChoiceAns[qIndex].style.backgroundColor = "purple";
        multChoiceAns[qIndex].style.textAlign = "start";
        multChoiceAns[qIndex].style.borderRadius = "10px";
        multChoiceAns[qIndex].setAttribute("id","quiz-answer-" + i);
        multChoiceAns[qIndex].setAttribute("data-index", i);
        multChoiceAnswers.style.margin = "10px 250px 10px 350px";
        multChoiceAnswers.appendChild(multChoiceAns[qIndex]);
    }
    renderChoiceResult();
}

function allDoneForm () {
    // Clear section children elements
    clearContent();

    // Append All Done children
    // Question section - used for heading and final score
    formHeading = document.createElement("h2");
    formHeading.innerHTML = "All done!";
    questionSection.appendChild(formHeading);
    finalScoreText = document.createElement("h3");
    finalScoreText.innerHTML = "Your final score is " + score + ".";
    questionSection.appendChild(finalScoreText);
    
    // Multiple choice answers section - used to enter initials for current score
    initialsLabel = document.createElement("label");
    initialsLabel.innerHTML = "Enter initials:";
    initialsLabel.setAttribute("for", "name");
    initialsLabel.setAttribute("id", "all-done-label")
    multChoiceAnswers.appendChild(initialsLabel);
    initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("id", "name");
    initialsInput.setAttribute("name", "name");
    initialsInput.setAttribute("minlength", "1");
    initialsInput.setAttribute("maxlength", "10");
    initialsInput.setAttribute("required", "true");
    // initialsInput.setAttribute("size", "10");
    multChoiceAnswers.appendChild(initialsInput);
    submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.style.width = "80px";
    submitButton.style.height = "40px";
    submitButton.style.fontSize = "16px";
    submitButton.style.color = "white";
    submitButton.style.margin = "10px";
    submitButton.style.borderRadius = "10px";
    submitButton.style.backgroundColor = "purple";
    submitButton.setAttribute("data-index", 2);
    submitButton.setAttribute("id","all-done-submit");
    multChoiceAnswers.appendChild(submitButton);

    // instructions.style.textAlign = "center";

    renderChoiceResult();
}

function renderHighScores () {
    // Clear section children elements
    clearContent();

    // Append High Scores children
    // Question section - used for heading and scores list top 5
    pageHeading = document.createElement("h2");
    pageHeading.innerHTML = "High scores";
    questionSection.appendChild(pageHeading);

    // Sort in descending order by score
    // highScores.reverse( compare );
    highScores.sort(compare);
    highScoreEl = [];

    for (let i = 0; i < Math.min(highScores.length,5); i++) {
        highScoreEl[i] = document.createElement("section");
        highScoreEl[i].innerHTML = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
        highScoreEl[i].style.height = "30px";
        highScoreEl[i].style.fontSize = "16px";
        highScoreEl[i].style.margin = "10px";
        highScoreEl[i].style.backgroundColor = "rgb(173, 117, 173)";
        highScoreEl[i].style.textAlign = "start";
        multChoiceAnswers.appendChild(highScoreEl[i]);
    }
}

// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
};
// var objs = [ 
//     { first_nom: 'Lazslo', last_nom: 'Jamf'     },
//     { first_nom: 'Pig',    last_nom: 'Bodine'   },
//     { first_nom: 'Pirate', last_nom: 'Prentice' }
// ];
// objs.sort( compare );

// Process link clicked in page header
viewHSLinkEl.addEventListener("click", function() {
    renderHighScores();
});

// Process button click in multChoiceAnswers section
multChoiceAnswers.addEventListener("click", function(event) {
    let element = event.target;
    let idx = element.getAttribute("data-index");

    // Check for any answer button
    if (element.matches("button") && element.id === ("quiz-answer-" + idx)) {
        if (multChoiceAnswers.children[idx].innerHTML === questions[qIndex].answer) {
            resultText = "Correct!"
            score = score + 5;
        } else {
            resultText = "Wrong!"
        }
        qIndex++;
        if (qIndex < 5) {
            renderQuestionForm(qIndex);
        } else {
            clearInterval(timeInterval);
            allDoneForm();
        }
    }

    // Check for Start Quiz button
    if (element.matches("button") && element.id === "start-quiz") {
        countDownInterval();
        renderQuestionForm(qIndex);
    }
    // Check for submit on All Done form
    if (element.matches("button") && element.id === "all-done-submit") {
        // console.log("Store score " + score + " and initials " + initialsStore);
        highScores = JSON.parse(localStorage.getItem("highScores"));
        if (highScores === null) {
            highScores = [];
        }
        highScore.initials = document.getElementById("name").value;
        highScore.score = score;
        highScores.push(highScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        renderHighScores();
        choiceResult.innerHTML = "";
    }
});

multChoiceAnswers.addEventListener("mouseover", function(event) {
    let element = event.target;
    if (element.matches("button")) {
        let idx = element.getAttribute("data-index");
        multChoiceAnswers.children[idx].style.backgroundColor = "rgb(173, 117, 173)";
    }
});

multChoiceAnswers.addEventListener("mouseout", function(event) {
    let element = event.target;
    if (element.matches("button")) {
        let idx = element.getAttribute("data-index");
        multChoiceAnswers.children[idx].style.backgroundColor = "purple";
    }
});

//Main logic
startQuiz();