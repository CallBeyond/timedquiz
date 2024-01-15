const quizData = [
    {
        question: "What are the primary data types in JavaScript?",
        choices: ["Strings and Booleans", "Numbers and Objects", "Arrays and Functions", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "How do you declare a variable in JavaScript using `let`?",
        choices: ["var variableName;", "let variableName;", "const variableName;", "set variableName;"],
        correctAnswer: "let variableName;"
    },
    {
        question: "What is the purpose of the `return` statement in a JavaScript function?",
        choices: ["To stop the function execution", "To output a value from the function", "To declare a variable", "To define a parameter"],
        correctAnswer: "To output a value from the function"
    },
    {
        question: "How do you access the third element in an array with the variable `myArray`?",
        choices: ["myArray[2]", "myArray[1]", "myArray[3]", "myArray.third()"],
        correctAnswer: "myArray[2]"
    },
    {
        question: "Write a simple `if` statement that checks if a variable `age` is greater than or equal to 18.",
        choices: ["if age > 18 { }", "if (age >= 18) { }", "if age == 18 then { }", "check(age >= 18)"],
        correctAnswer: "if (age >= 18) { }"
    }
];

// DOM Elements
// Button to start the quiz
const startBtn = document.getElementById('start-btn');

// The initial screen that is displayed before the quiz starts
const startScreen = document.getElementById('start-screen');

// The container that will hold the questions once the quiz starts
const questionsContainer = document.getElementById('questions-container');

// The element that will display the title of the current question
const questionTitle = document.getElementById('question-title');

// The list that will display the choices for the current question
const choicesList = document.getElementById('choices-list');

// The screen that is displayed when the quiz is over
const gameOverScreen = document.getElementById('game-over-screen');

// The element that will display the final score once the quiz is over
const finalScore = document.getElementById('final-score');

// The input field where the user can enter their initials to save their score
const initialsInput = document.getElementById('initials');

// The button to submit the score
const submitScoreBtn = document.getElementById('submit-score-btn');

// Event Listeners
startBtn.addEventListener('click', startQuiz);
submitScoreBtn.addEventListener('click', submitScore);

// Starting the timer at 10 seconds
let timer = 15;

// Functions
function startQuiz() {
    //  Applies the 'hidden' css class to hide the start screen
    score = 0;
    startScreen.classList.add('hidden');
    //  Removes the 'hidden' css class to show the questions container
    questionsContainer.classList.remove('hidden');
    //  Start with the first question
    askQuestion(0); 

    // Start the timer
    const timerInterval = setInterval(() => {
        timer--;
        // Update the timer display
        // Replace 'timerDisplay' with the ID of your HTML element for displaying the timer
        document.getElementById('timerDisplay').textContent = `Time: ${timer}`;

        // Check if time is up
        if (timer <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000); // 1000 ms = 1 second

}

// This function is used to display a question and its choices to the user
function askQuestion(questionIndex) {
    //  Check if there are still questions left in the quiz
    if (questionIndex < quizData.length) {
        //  Get the current question from the quiz data
        const currentQuestion = quizData[questionIndex];

        //  Update the question title with the current question
        questionTitle.textContent = currentQuestion.question;

        //  Clear the choices list from the previous question
        choicesList.innerHTML = "";

        //  Populate the choices list with the choices of the current question
        currentQuestion.choices.forEach(choice => {
            //  Create a new list item for each choice
            const listItem = document.createElement('li');
            //  Set the text of the list item to the choice
            listItem.textContent = choice;
            //  Add an event listener to the list item that will check the answer when clicked
            listItem.addEventListener('click', () => checkAnswer(choice, questionIndex));
            //  Add the list item to the choices list
            choicesList.appendChild(listItem);
        });
    } else {
        //  If there are no more questions, end the quiz
        endQuiz();
    }
}


function checkAnswer(userChoice, questionIndex) {
    const currentQuestion = quizData[questionIndex];
    
    if (userChoice === currentQuestion.correctAnswer) {
        // Handle correct answer
        score += 5;
        console.log(score);
    } else {
        // Handle incorrect answer
        if (score > 0) {
            score -= 5;
        }
        if (timer > 0) {
            timer -= 2;
        }
        console.log(score);
    }

    //  Move to the next question
    askQuestion(questionIndex + 1);
}

function endQuiz() {
    //  Hide the questions container
    questionsContainer.classList.add('hidden');
    //  Show the game over screen
    gameOverScreen.classList.remove('hidden');

    //  Display final score to the user
    finalScore.textContent = score + "/25"; 
}

function submitScore() {
    //  Get user's initials and convert to uppercase
    const initials = initialsInput.value.toUpperCase();
    //  Store the score in localStorage
    localStorage.setItem('score', score);
    localStorage.setItem('initials', initials);
    //  Redirect the user or perform other actions
}
