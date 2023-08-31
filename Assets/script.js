const viewHighScores = document.querySelector("#view-high-scores");
const questionSection = document.querySelector("#question");
const multChoiceAnswers = document.querySelector("#mult-choice-answers");
const choiceResult = document.querySelector("#choice-result");

// Handles for dynamically created elements
let viewHSLinkEl, highScoreAnchor, quizHeader, instructions, startButton;
let multChoiceAns;  //Table handle

// Misc variables, etc.
let getNextQuestion = true;

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

function renderHeader () {
    highScoreAnchor = document.createElement("a");
    highScoreAnchor.href = "#question";
    highScoreAnchor.innerHTML = "View high scores";
    highScoreAnchor.id = "viewHSLink";
    viewHighScores.appendChild(highScoreAnchor);

    viewHSLinkEl = document.querySelector("#viewHSLink");    
    viewHSLinkEl.addEventListener("click", function() {
        highScores();
    });
}

function clearContent () {
    questionSection.innerHTML = "";
    multChoiceAnswers.innerHTML = "";
    choiceResult.innerHTML = "";
}

function startQuiz () {
    // Clear section children elements
    clearContent();

    // Append startQuiz children
    // Question section
    quizHeader = document.createElement("h2");
    quizHeader.innerHTML = "Coding Quiz Challenge";
    questionSection.appendChild(quizHeader);
    questionSection.setAttribute("margin-left", "auto");
    questionSection.setAttribute("margin-right", "auto");

    instructions = document.createElement("p");
    instructions.innerHTML = "Try to answer the following code-related questions within the time limit.<br>"
                        + "Keep in mind that incorrect answers will penalize your score/time<br>"
                        + "by ten seconds!";
    questionSection.appendChild(instructions);
    
    // Multiple choice answers section - reused in this function only for Start button
    startButton = document.createElement("button");
    startButton.innerHTML = "Start Quiz";
    startButton.style.width = "100px";
    startButton.style.height = "50px";
    startButton.style.fontSize = "16px";
    startButton.style.color = "white";
    startButton.style.backgroundColor = "purple";
    multChoiceAnswers.appendChild(startButton);

    startButton.addEventListener("click", function() {
        startButton.style.backgroundColor = "rgb(173, 117, 173)";
        accessQuestions(0);
    });
}

function accessQuestions (qIndex) {
    // console.log(questions.length);

    // for (qIndex = 0; qIndex < questions.length; qIndex++) {
    for (qIndex = 0; qIndex < 1; qIndex++) {
        questionForm(qIndex);
    }
}

function questionForm (qIndex) {
    // Clear section children elements
    clearContent();

    // Append questionForm children
    // Question section
    quizQuestion = document.createElement("h2");
    // console.log(questions[qIndex].title);
    quizQuestion.innerHTML = questions[qIndex].title;
    questionSection.appendChild(quizQuestion);
    // console.log(questionSection);
    
    // Multiple choice answers section
    multChoiceAns = [];
    // console.log(questions[qIndex].choices.length);
    // console.log(multChoiceAns);

    for (let i = 0; i < questions[qIndex].choices.length; i++) {
        multChoiceAns[qIndex] = document.createElement("button");
        multChoiceAns[qIndex].innerHTML = questions[qIndex].choices[i];
        multChoiceAns[qIndex].style.width = "100px";
        multChoiceAns[qIndex].style.height = "40px";
        multChoiceAns[qIndex].style.fontSize = "14px";
        multChoiceAns[qIndex].style.margin = "10px";
        multChoiceAns[qIndex].style.color = "white";
        multChoiceAns[qIndex].style.backgroundColor = "purple";
        multChoiceAnswers.appendChild(multChoiceAns[qIndex]);
    }
    
    // const questions = [
    //     {
    //         title: "Commonly used data types DO NOT include:",
    //         choices: ["strings", "booleans", "alerts", "numbers"],
    //         answer: "alerts"
    //     },
}

function allDoneForm () {

}

function highScores () {
    console.log("High score function called.");
}

renderHeader();
startQuiz();