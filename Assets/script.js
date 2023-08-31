const viewHighScores = document.querySelector("#view-high-scores");
const question = document.querySelector("#question");
const multChoiceAnswers = document.querySelector("#mult-choice-answers");
// Handles for dynamically created elements
let viewHSLinkEl, anchor, h2, paragraph, startButton;


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
    }
];

function renderHeader () {
    anchor = document.createElement("a");
    anchor.href = "#question";
    anchor.innerHTML = "View high scores";
    anchor.id = "viewHSLink";
    viewHighScores.appendChild(anchor);

    viewHSLinkEl = document.querySelector("#viewHSLink");    
    viewHSLinkEl.addEventListener("click", function() {
        highScores();
    });
}

function startQuiz () {
    // Append startQuiz children
    // Question section
    h2 = document.createElement("h2");
    h2.innerHTML = "Coding Quiz Challenge";
    question.appendChild(h2);
    paragraph = document.createElement("p");
    paragraph.innerHTML = "Try to answer the following code-related questions within the time limit.<br>"
                        + "Keep in mind that incorrect answers will penalize your score/time<br>"
                        + "by ten seconds!";
    question.appendChild(paragraph);
    
    // Multiple choice answers section
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
        questionForm();
    });
}

function questionForm () {
    console.log("Question form function called.");
}

function allDoneForm () {

}

function highScores () {
    console.log("High score function called.");
}

renderHeader();
startQuiz();