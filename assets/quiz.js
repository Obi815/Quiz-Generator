const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');
const progressText = document.querySelector('#progressText');
const scoretext = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availabelQuestions = []

let questions = [
    {
        question: 'question 2'
        choice 1: '1',
        choice 2: '2',
        choice 3: '3',
        choice 4: '4',
        answer: 3,
    },
    {
        question: 'question 3'
        choice 1: '1',
        choice 2: '2',
        choice 3: '3',
        choice 4: '4',
        answer: 3,
    },
    {
        question: 'question 3'
        choice 1: '1',
        choice 2: '2',
        choice 3: '3',
        choice 4: '4',
        answer: 3,
    },
    {
        question: 'question 5'
        choice 1: '1',
        choice 2: '2',
        choice 3: '3',
        choice 4: '4',
        answer: 3,
    },
    {
        question: 'question 6'
        choice 1: '1',
        choice 2: '2',
        choice 3: '3',
        choice 4: '4',
        answer: 3,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availabelQuestions = [...questions]
    getNewQestion()
}
getNewQestion = () => {
    if(availabelQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random()* availabelQuestions.length)
    currentQuestion = availabelQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion[ 'choice' + number]
    })
    availabelQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if( classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQestion()
        }, 1000)
    })
})
