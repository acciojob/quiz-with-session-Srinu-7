// Define quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["J.K. Rowling", "William Shakespeare", "Mark Twain", "Charles Dickens"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Shark", "Giraffe"],
    answer: "Blue Whale"
  }
];

// Load selected options from session storage if available
document.addEventListener("DOMContentLoaded", function() {
  const quizForm = document.getElementById('quizForm');
  const questionsContainer = document.getElementById('questionsContainer');
  const submitButton = document.getElementById('submitQuiz');
  const scoreDisplay = document.getElementById('scoreDisplay');

  // Load progress from session storage or initialize an empty object
  const progress = JSON.parse(sessionStorage.getItem('progress')) || {};

  // Function to render the questions
  function renderQuestions() {
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = `<p>${q.question}</p>`;

      // Create options for each question
      q.options.forEach(option => {
        const optionLabel = document.createElement('label');
        const optionInput = document.createElement('input');
        optionInput.type = 'radio';
        optionInput.name = `question${index}`;
        optionInput.value = option;

        // Pre-check saved options from session storage
        if (progress[`question${index}`] === option) {
          optionInput.checked = true;
        }

        // Save selected option to session storage on change
        optionInput.addEventListener('change', () => {
          progress[`question${index}`] = option;
          sessionStorage.setItem('progress', JSON.stringify(progress));
        });

        optionLabel.appendChild(optionInput);
        optionLabel.appendChild(document.createTextNode(option));
        questionDiv.appendChild(optionLabel);
        questionDiv.appendChild(document.createElement('br'));
      });

      questionsContainer.appendChild(questionDiv);
    });
  }

  // Function to calculate and display the score
  function calculateScore() {
    let score = 0;
    questions.forEach((q, index) => {
      const selectedOption = progress[`question${index}`];
      if (selectedOption === q.answer) {
        score++;
      }
    });

    const totalScore = `Your score is ${score} out of ${questions.length}`;
    scoreDisplay.textContent = totalScore;
    localStorage.setItem('score', score);  // Save the score in localStorage
  }

  // Handle the submit button click
  submitButton.addEventListener('click', () => {
    calculateScore();
  });

  // Render the questions on page load
  renderQuestions();
});
