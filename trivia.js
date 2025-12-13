// ===============================
// CLI TRIVIA GAME (FULL VERSION)
// ===============================

const readline = require("readline");

// CLI Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ===============================
// ANSI Colors for Better UX
// ===============================
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m"
};

// ===============================
// Trivia Question Bank
// ===============================
const triviaData = {
  easy: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup"],
      answer: 0
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "##", "<!-- -->"],
      answer: 0
    }
  ],
  medium: [
    {
      question: "Which array method creates a new array?",
      options: ["forEach()", "map()", "push()"],
      answer: 1
    },
    {
      question: "Which keyword stops a loop?",
      options: ["stop", "break", "exit"],
      answer: 1
    }
  ],
  hard: [
    {
      question: "Which method converts an object to JSON?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()"],
      answer: 1
    },
    {
      question: "Which scope does 'let' have?",
      options: ["Global", "Function", "Block"],
      answer: 2
    }
  ]
};

// ===============================
// Game State
// ===============================
let questions = [];
let currentIndex = 0;
let score = 0;
let questionTimer;
let gameTimer;

const QUESTION_TIME = 10; // seconds
const GAME_TIME = 60; // seconds

// ===============================
// Start Game
// ===============================
function startGame() {
  console.clear();
  console.log(`${colors.cyan}🎮 CLI Trivia Game${colors.reset}`);
  console.log("Choose difficulty:");
  console.log("1. Easy\n2. Medium\n3. Hard");

  rl.question("\nSelect (1-3): ", (choice) => {
    selectDifficulty(choice);
  });
}

// ===============================
// Difficulty Selection
// ===============================
function selectDifficulty(choice) {
  switch (choice) {
    case "1":
      questions = triviaData.easy;
      break;
    case "2":
      questions = triviaData.medium;
      break;
    case "3":
      questions = triviaData.hard;
      break;
    default:
      console.log(`${colors.red}Invalid choice.${colors.reset}`);
      return startGame();
  }

  startTimers();
  askQuestion();
}

// ===============================
// Global Game Timer
// ===============================
function startTimers() {
  let timeLeft = GAME_TIME;
  gameTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

// ===============================
// Ask Question
// ===============================
function askQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentIndex];
  let timeLeft = QUESTION_TIME;

  console.log(`\n${colors.yellow}Question ${currentIndex + 1}/${questions.length}${colors.reset}`);
  console.log(q.question);

  q.options.forEach((opt, i) => {
    console.log(`${i + 1}. ${opt}`);
  });

  questionTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      console.log(`${colors.red}⏰ Time’s up!${colors.reset}`);
      currentIndex++;
      askQuestion();
    }
  }, 1000);

  rl.question("\nYour answer: ", (input) => {
    clearInterval(questionTimer);
    validateAnswer(input);
  });
}

// ===============================
// Validate Answer
// ===============================
function validateAnswer(input) {
  const q = questions[currentIndex];
  const answer = parseInt(input) - 1;

  if (answer === q.answer) {
    console.log(`${colors.green}✅ Correct!${colors.reset}`);
    score++;
  } else {
    console.log(`${colors.red}❌ Incorrect!${colors.reset}`);
  }

  currentIndex++;
  askQuestion();
}

// ===============================
// End Game
// ===============================
function endGame() {
  clearInterval(gameTimer);
  console.log(`\n${colors.cyan}🎉 Game Over${colors.reset}`);
  console.log(`Score: ${score}/${questions.length}`);

  const percentage = Math.round((score / questions.length) * 100);
  console.log(`Performance: ${percentage}%`);

  if (percentage >= 70) {
    console.log(`${colors.green}Excellent work!${colors.reset}`);
    console.log(`${colors.green}🏆 You're a trivia master!${colors.reset}`);
  } else if (percentage >= 50) {
    console.log(`${colors.yellow}Good job!${colors.reset}`);
  } else {
    console.log(`${colors.red}Keep practicing!${colors.reset}`);
  }
