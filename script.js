const answerButtonsContainer = document.querySelector(
  ".answer-buttons-container"
);
const questionContainer = document.querySelector(".question");
const bestScoreContainer = document.querySelector(".best-score");
const currentScoreContainer = document.querySelector(".current-score");
const answerContainer = document.querySelector(".answer-container");
const newBestContainer = document.querySelector(".new-best-container");
const totalQuestionsContainer = document.querySelector(
  ".total-questions-container"
);

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", next);

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", restart);

let currentQuestion = 0;
let currentScore = 0;
let bestScore = 0;

let questions = [
  {
    question: "What  is 2+2?",
    answers: [
      { option: "4", answer: true },
      { option: "22", answer: false },
    ],
  },
  {
    question: "What  is 4+4?",
    answers: [
      { option: "8", answer: true },
      { option: "44", answer: false },
    ],
  },
  {
    question: "What  is 6+6?",
    answers: [
      { option: "12", answer: true },
      { option: "66", answer: false },
    ],
  },
  {
    question: "What  is 8+8?",
    answers: [
      { option: "16", answer: true },
      { option: "88", answer: false },
    ],
  },
  {
    question: "What  is 10+10?",
    answers: [
      { option: "20", answer: true },
      { option: "1010", answer: false },
    ],
  },
];

beginQuiz();

function beginQuiz() {
  currentQuestion = 0;
  currentScore = 0;
  currentScoreContainer.textContent = `Your current score: ${currentScore}/${questions.length}`;
  bestScoreContainer.textContent = `Your best score: ${bestScore}`;
  questionContainer.textContent = questions[currentQuestion].question;
  totalQuestionsContainer.textContent = `Question: ${currentQuestion + 1}/${
    questions.length
  }`;
  createButtons();
}

function next() {
  nextBtn.style.display = "none";
  questionContainer.textContent = questions[currentQuestion].question;
  answerButtonsContainer.replaceChildren();
  answerContainer.textContent = "";
  totalQuestionsContainer.textContent = `Question: ${currentQuestion + 1}/${
    questions.length
  }`;
  createButtons();
}

function restart() {
  if (currentScore > bestScore) {
    bestScore = currentScore;
    newBestContainer.textContent = "Congratulations, new best score!";
  }

  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
  answerButtonsContainer.replaceChildren();
  answerContainer.textContent = "";
  questions.sort(() => Math.random() - 0.5);
  beginQuiz();
}

function createButtons() {
  questions[currentQuestion].answers.forEach((button) => {
    let answerButton = document.createElement("button");
    answerButton.textContent = button.option;
    answerButton.className = "btn";
    if (button.answer) {
      answerButton.id = "true";
    } else {
      answerButton.id = "false";
    }

    answerButtonsContainer.appendChild(answerButton);
  });

  Array.from(answerButtonsContainer.children).forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "true") {
        button.classList.add("true");
        currentScore++;
        answerContainer.textContent = "Correct answer!";
        answerContainer.style.color = "green";
        checkTrueOrFalse();
      } else {
        button.classList.add("false");
        answerContainer.textContent = "Wrong answer!";
        answerContainer.style.color = "red";
        checkTrueOrFalse();
      }
    });
  });
}

function checkTrueOrFalse() {
  newBestContainer.textContent = "";
  Array.from(answerButtonsContainer.children).forEach((button) => {
    if (button.id === "true") {
      button.classList.add("true");
    } else {
      button.classList.add("false");
    }
    button.disabled = true;
  });

  currentQuestion++;
  nextBtn.style.display = "flex";
  if (currentQuestion != 0) {
    restartBtn.style.display = "flex";
  }
  currentScoreContainer.textContent = `Your current score: ${currentScore}/${questions.length}`;

  if (currentQuestion >= questions.length) {
    nextBtn.style.display = "none";
  }
}
