const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    id: 4,
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
  {
    id: 5,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    answer: "Harper Lee",
  },
  {
    id: 6,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Go", "Gd"],
    answer: "Au",
  },
  {
    id: 7,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    answer: "Blue Whale",
  },
  {
    id: 8,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    id: 9,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent Van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    id: 10,
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    answer: "Mitochondria",
  },
  {
    id: 11,
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Lion", "Horse", "Kangaroo"],
    answer: "Cheetah",
  },
  {
    id: 12,
    question: "Who is known as the 'Father of Computers'?",
    options: [
      "Charles Babbage",
      "Alan Turing",
      "John von Neumann",
      "Steve Jobs",
    ],
    answer: "Charles Babbage",
  },
  {
    id: 13,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    id: 14,
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
  {
    id: 15,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond",
  },
  {
    id: 16,
    question: "What year did the Titanic sink?",
    options: ["1910", "1912", "1914", "1916"],
    answer: "1912",
  },
  {
    id: 17,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Malta", "Vatican City", "San Marino"],
    answer: "Vatican City",
  },
  {
    id: 18,
    question: "Who discovered penicillin?",
    options: [
      "Marie Curie",
      "Alexander Fleming",
      "Louis Pasteur",
      "Isaac Newton",
    ],
    answer: "Alexander Fleming",
  },
  {
    id: 19,
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Onion", "Avocado", "Pepper"],
    answer: "Avocado",
  },
  {
    id: 20,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
];

const question = document.getElementById("quiz-container");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const restartBtn = document.getElementById("restart");
let questionNumber = 1;
let questionIndex = 0;
let correctAnswers = [];
let selectedAnswers = [];
let correctAnswerCount = 0;

const updateSelectedAnswer = () => {
  const options = document.getElementsByName("answer");
  let selectedOption = "";
  for (const option of options) {
    if (option.checked) {
      selectedOption = option.nextElementSibling.textContent;
      break;
    }
  }
  selectedAnswers[questionIndex] = selectedOption;
  // console.log(selectedAnswers)
}


const displayQuestion = () => {
  question.innerHTML = `
    <h4 class="question-header">Question ${questionNumber}</h4>
    <p id="question" class="question">
      ${quizData[questionIndex].question}
    </p>

    <form id="options-form">
      ${quizData[questionIndex].options.map((item, index) => `
        <div class="option">
          <input type="radio" name="answer" id="option${index}" ${selectedAnswers[questionIndex] === item ? 'checked' : ''}/>
          <label for="option${index}">${item}</label>
        </div>`
      ).join('')}
    </form>`;
}

const nextQuestion = () => {
  updateSelectedAnswer();

  if (questionIndex < quizData.length - 1) {
    questionNumber += 1;
    questionIndex += 1;
    displayQuestion();
  }else {
    submitQuiz()
    question.innerHTML= `<p>You got ${correctAnswerCount} questions correct!</p>`
  }

  questionNumber > 19 && (nextBtn.textContent = `submit`)
}


const previousQuestion = () => {
  updateSelectedAnswer();

  if (questionIndex > 0) {
    questionNumber -= 1;
    questionIndex -= 1;
    displayQuestion();
  }

  questionNumber <= 19 && (nextBtn.textContent = `Next`)
}

const submitQuiz = () => {
  for (let i = 0; i < quizData.length; i++){
    if (selectedAnswers[i] === quizData[i].answer){
      correctAnswerCount++;
    }
  }

  previousBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  restartBtn.classList.add("show")
}

const restartQuiz = () => {
  questionNumber = 1;
  questionIndex = 0;
  displayQuestion()
  previousBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  restartBtn.classList.remove("show")
}

displayQuestion();
nextBtn.addEventListener("click", nextQuestion);
previousBtn.addEventListener("click", previousQuestion);
restartBtn.addEventListener("click", restartQuiz);
