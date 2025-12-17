const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Trivia questions
const questions = [
  {
    question: "What does CLI stand for?",
    options: ["A. Computer Logic Interface", "B. Command Line Interface", "C. Control Line Input"],
    answer: "B"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["A. var", "B. let", "C. const", "D. All of the above"],
    answer: "D"
  },
  {
    question: "Which data type stores true or false values?",
    options: ["A. String", "B. Boolean", "C. Number"],
    answer: "B"
  }
];

let score = 0;
let currentQuestion = 0;
const TIME_LIMIT = 10; // seconds
let timer;

// Ask a question
function askQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];

  console.log(`\nQuestion ${currentQuestion + 1}: ${q.question}`);
  q.options.forEach(option => console.log(option));
  console.log(`(You have ${TIME_LIMIT} seconds to answer)`);

  timer = setTimeout(() => {
    console.log("\n⏰ Time's up!");
    currentQuestion++;
    askQuestion();
  }, TIME_LIMIT * 1000);

  rl.question("Your answer: ", (input) => {
    clearTimeout(timer);

    if (input.toUpperCase() === q.answer) {
      console.log("✅ Correct!");
      score++;
    } else {
      console.log(`❌ Wrong! The correct answer was ${q.answer}`);
    }

    currentQuestion++;
    askQuestion();
  });
}

// End the game
function endGame() {
  console.log("\n🎉 Game Over!");
  console.log(`Your final score: ${score} / ${questions.length}`);

  if (score === questions.length) {
    console.log("🏆 Excellent work!");
  } else if (score >= 1) {
    console.log("👍 Good effort!");
  } else {
    console.log("💡 Keep practicing!");
  }

  rl.close();
}

// Start game
console.log("🎮 Welcome to the CLI Trivia Game!");
askQuestion();
