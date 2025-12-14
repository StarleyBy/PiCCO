document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const questionCounter = document.getElementById('question-counter');
    const questionTotal = document.getElementById('question-total');
    const questionText = document.getElementById('question-text');
    const parametersGrid = document.getElementById('parameters-grid');
    const optionsContainer = document.getElementById('options-container');
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const resultsScreen = document.getElementById('results-screen');
    const scoreFinal = document.getElementById('score-final');
    const totalFinal = document.getElementById('total-final');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Fetch questions from JSON file
    async function fetchQuestions() {
        try {
            const res = await fetch('../Quiz/questions.json');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            questions = await res.json();
            startGame();
        } catch (error) {
            questionText.textContent = 'Failed to load questions. Please refresh the page.';
            console.error('Fetch error:', error);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        resultsScreen.classList.add('hidden');
        quizContainer.style.display = '';
        
        shuffleArray(questions); // Randomize question order

        questionTotal.textContent = questions.length;
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        // Reset state
        feedbackSection.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
        while (parametersGrid.firstChild) {
            parametersGrid.removeChild(parametersGrid.firstChild);
        }

        // Display question info
        questionCounter.textContent = currentQuestionIndex + 1;
        questionText.textContent = question.question;

        // Display parameters
        for (const [key, value] of Object.entries(question.parameters)) {
            const paramItem = document.createElement('div');
            paramItem.className = 'param-item';
            paramItem.innerHTML = `<span class="param-label">${key}</span><span class="param-value">${value}</span>`;
            parametersGrid.appendChild(paramItem);
        }

        // Display options
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.style.animationDelay = `${index * 0.1}s`; // Staggered animation
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswerIndex;

        if (isCorrect) {
            score++;
            feedbackTitle.textContent = 'Correct!';
            feedbackTitle.style.color = 'var(--correct-color)';
        } else {
            feedbackTitle.textContent = 'Incorrect';
            feedbackTitle.style.color = 'var(--incorrect-color)';
            quizContainer.classList.add('shake-animation'); // Trigger shake on container
            quizContainer.addEventListener('animationend', () => {
                quizContainer.classList.remove('shake-animation');
            }, { once: true });
        }

        feedbackText.textContent = question.rationale;
        feedbackSection.classList.remove('hidden');

        // Highlight answers
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        optionButtons.forEach((btn, index) => {
            if (index === question.correctAnswerIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true; // Disable all buttons
        });

        // Show next button
        nextQuestionBtn.classList.remove('hidden');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            showResults();
        }
    }

    function showResults() {
        quizContainer.style.display = 'none';
        scoreFinal.textContent = score;
        totalFinal.textContent = questions.length;
        resultsScreen.classList.remove('hidden');
    }

    // Event Listeners
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    restartQuizBtn.addEventListener('click', startGame);

    // Initial load
    fetchQuestions();
});
