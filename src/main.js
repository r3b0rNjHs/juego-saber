function application() {

    let questions = [];
    let startButton;
    let questionsContainer;
    let serverData = null;
    let nextQuestionButton;
    let questionTitle;
    let questionAnswers;
    let radioAnswersList;
    let timerId;
    let countdown;
    let theQuestionNavigator;

    function start(){
        startButton = document.querySelector('.start--button');
        startButton.addEventListener('click', onStartGame);
        questionsContainer = document.querySelector('.questions__container');
        questionTitle = document.querySelector('.question--title');
        questionAnswers = document.querySelectorAll('.question--answer');
        radioAnswersList = document.querySelectorAll('.input-radio');
        nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.addEventListener('click', onNextQuestion);

        getNextQuestions(function (data) {
            questions = data;
            theQuestionNavigator = questionsNavigator(questions);
        });
    }

    function onStartGame(){
        resetCountdown();
        startTimer();
        loadNextQuestion();
    }
    function onNextQuestion(){
        loadNextQuestion();
    }
    function loadNextQuestion() {
        resetCountdown();
        if (theQuestionNavigator.areThereNonVisitedQuestions()) {
            renderQuestion(theQuestionNavigator.getNextQuestion());
        }
        else {
            gameOver();
        }
    }
    function gameOver(){
        hideContainerPanel();
        stopTimer();
        theQuestionNavigator.resetQuestions();
    }

    function questionsNavigator (questions){
        let nonVisitedQuestions = true;
        let questionsIndex = 0;
        function areThereNonVisitedQuestions(){
            return nonVisitedQuestions;
        }
        function resetQuestions(){
            questionsIndex = 0;
        }
        function goToNextQuestion(){
            questionsIndex++;
        }
        function getNextQuestion() {
            let question = questions[questionsIndex];
            goToNextQuestion();
            if (questionsIndex >= questions.length) {
                nonVisitedQuestions = false;
                resetQuestions();
            }
            return question;

        }
        return {
            areThereNonVisitedQuestions,
            resetQuestions,
            getNextQuestion
        }
    }

    function startTimer() {
        timerId = setInterval(function(){
            updateCountdown(onNextQuestion, timeChanged);
        }, 1000);
        updateCountdown(onNextQuestion, timeChanged);
    }
    function stopTimer(){
        clearInterval(timerId);
    }
    function resetCountdown(){
        countdown = 10;
    }
    function timeChanged() {
        let clock = document.querySelector('.clock');
        clock.innerHTML = countdown;
    }
    function updateCountdown(onTimeout, onTimeChanged){
        countdown--;
        if (countdown > 0) {
            onTimeChanged();
        }
        else if (countdown === 0) {
            onTimeout();
        }
    }

    function getNextQuestions(callback) {

        serverData = serverData || [
            {
                id: 1,
                title: '¿Cuántos años tiene María?',
                answers: [
                    {id: 0, answer: '25'},
                    {id: 1, answer: '33'},
                    {id: 2, answer: '37'}
                ],
                correctAnswer: {id: 1}
            },
            {
                id: 2,
                title: '¿Cuál es la capital de Zambia?',
                answers: [
                    {id: 0, answer: 'Lusaka'},
                    {id: 1, answer: 'Harare'},
                    {id: 2, answer: 'Madrid'}
                ],
                correctAnswer: {id: 0}
            },
            {
                id: 3,
                title: '¿Cuál es el nombre completo de Freud?',
                answers: [
                    {id: 0, answer: 'Adolf'},
                    {id: 1, answer: 'Sefarad'},
                    {id: 2, answer: 'Sigmund'}
                ],
                correctAnswer: {id: 2}
            },
            {
                id: 4,
                title: '¿Cuál es el animal más rápido del mundo?',
                answers: [
                    {id: 0, answer: 'Guepardo'},
                    {id: 1, answer: 'León'},
                    {id: 2, answer: 'Tortuga'}
                ],
                correctAnswer: {id: 0}
            }
        ];
        callback(serverData);
    }

    function renderQuestion(question) {
        showContainerPanel();
        questionTitle.innerHTML = (question.title);
        questionTitle.setAttribute('id', question.id);
        for (let x = 0; x < question.answers.length; x++) {
            questionAnswers[x].innerHTML = (question.answers[x].answer);
            radioAnswersList[x].setAttribute('id', question.answers[x].id);
        }
    }
    function showContainerPanel(){
        questionsContainer.classList.remove('hidden');
    }
    function hideContainerPanel() {
        questionsContainer.classList.toggle('hidden');
    }

    return {
        start,
        setServerData(data){
            serverData = data;
        },
        questionsNavigator



    }
}

function moduleDefined() {
    return typeof(module) !== 'undefined';
}

// be able to import the file in node
if (moduleDefined()){
    module.exports = application;
}