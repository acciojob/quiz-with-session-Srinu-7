// Store references to DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load user progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Display the quiz questions and choices
function renderQuestions() {
    questionsElement.innerHTML = ""; // Clear previous questions
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);
        for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            if (userAnswers[i] === choice) {
                choiceElement.setAttribute("checked", true);
            }
            choiceElement.addEventListener("change", function () {
                userAnswers[i] = choice;
                sessionStorage.setItem("progress", JSON.stringify(userAnswers));
            });
            const choiceLabel = document.createElement("label");
            choiceLabel.appendChild(choiceElement);
            choiceLabel.appendChild(document.createTextNode(choice));
            questionElement.appendChild(choiceLabel);
            questionElement.appendChild(document.createElement("br"));
        }
        questionsElement.appendChild(questionElement);
    }
}

// Calculate the score and display it
function submitQuiz() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    scoreElement.innerText = `Your score is ${score} out of 5.`;
    localStorage.setItem("score", score); // Save score in local storage
}

// Render the questions when the page loads
renderQuestions();

// Attach event listener to the submit button
submitButton.addEventListener("click", submitQuiz);
