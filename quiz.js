const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressTest = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};

let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is 3 + 2?",
        choice1: "6",
        choice2: "5",
        choice3: "7",
        choice4: "4",
        answer: "5",
    },
    {
        question: "What is 5 + 2?",
        choice1: "6",
        choice2: "5",
        choice3: "7",
        choice4: "4",
        answer: "7",
    },
    {
        question: "What is 3 + 3?",
        choice1: "6",
        choice2: "5",
        choice3: "7",
        choice4: "4",
        answer: "6",
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;



