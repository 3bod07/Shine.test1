// تحديد العناصر من HTML
const introScreen = document.getElementById('intro-screen');
const quizContainer = document.getElementById('quiz-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const startButton = document.getElementById('start-button');
const resultsContainer = document.getElementById('results-container');
const scoreText = document.getElementById('score');
const totalQuestionsText = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');
const yourName = document.getElementById('your-name');
const currentYear = document.getElementById('current-year');

// تعيين اسمك والسنة الحالية
yourName.textContent = 'اسمك هنا'; // غيّر هذا إلى اسمك
currentYear.textContent = new Date().getFullYear();

// قائمة الأسئلة - يمكنك تعديلها حسب رغبتك
const questions = [
    {
        question: "ما هي أكبر دولة عربية من حيث المساحة؟",
        answers: [
            { text: "السعودية", correct: false },
            { text: "الجزائر", correct: true },
            { text: "مصر", correct: false },
            { text: "السودان", correct: false }
        ]
    },
    {
        question: "ما هو العنصر الأكثر وفرة في القشرة الأرضية؟",
        answers: [
            { text: "الحديد", correct: false },
            { text: "الكربون", correct: false },
            { text: "الألمنيوم", correct: false },
            { text: "الأكسجين", correct: true }
        ]
    },
    {
        question: "من هو مؤلف كتاب 'مقدمة ابن خلدون'؟",
        answers: [
            { text: "ابن سينا", correct: false },
            { text: "ابن رشد", correct: false },
            { text: "ابن خلدون", correct: true },
            { text: "الغزالي", correct: false }
        ]
    },
    {
        question: "كم عدد لاعبي كرة القدم في الفريق الواحد؟",
        answers: [
            { text: "10", correct: false },
            { text: "11", correct: true },
            { text: "12", correct: false },
            { text: "9", correct: false }
        ]
    },
    {
        question: "ما هي عاصمة المملكة العربية السعودية؟",
        answers: [
            { text: "جدة", correct: false },
            { text: "مكة", correct: false },
            { text: "الرياض", correct: true },
            { text: "المدينة", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

// بدء اللعبة
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);

function startGame() {
    introScreen.classList.add('hide');
    resultsContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
}

function showQuestion(question) {
    questionText.textContent = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    
    if (correct) {
        score++;
    }
    
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true; // تعطيل جميع الأزرار بعد الاختيار
    });
    
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResults() {
    quizContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreText.textContent = score;
    totalQuestionsText.textContent = questions.length;
}
