function application() {
    'use strict';

    const poolOfQuestions = [{
        id: 1,
        question: "¿Cuál es la capital de Portugal?",
        answers: [
            {id: 0, answer: "Faro", isCorrect: false, idQuestion: 1},
            {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 1},
            {id: 2, answer: "Lisboa", isCorrect: true, idQuestion: 1}
        ]
    },
        {
            id: 2,
            question: "¿Cuál es la capital de Egipto?",
            answers: [
                {id: 0, answer: "Faro", isCorrect: false, idQuestion: 2},
                {id: 1, answer: "El Cairo", isCorrect: true, idQuestion: 2},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 2}
            ]
        },
        {
            id: 3,
            question: "¿Cuál es la capital de Zambia?",
            answers: [
                {id: 0, answer: "Lusaka", isCorrect: true, idQuestion: 3},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 3},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 3}
            ]
        },
        {
            id: 4,
            question: "¿Cuál es la capital de Jordania?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 4},
                {id: 1, answer: "Amán", isCorrect: true, idQuestion: 4},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 4}
            ]
        },
        {
            id: 5,
            question: "¿Cuál es la capital de Panama?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 5},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 5},
                {id: 2, answer: "Ciudad de Panamá", isCorrect: true, idQuestion: 5}
            ]
        }];

    const boxQuestions = document.querySelector('.questions');
    const btnSend = document.querySelector('.btn');
    const btnStart = document.querySelector('.btnStart');
    const btnSave = document.querySelector('.btnSave');
    let msg = document.querySelector('.message');
    let timer = document.querySelector('.seconds');
    let nameBox = document.querySelector('.nameBox');
    let scoreUI = document.querySelector('.scoreUI');
    let totalPoints = 0;
    let seconds = 0;
    let i = 0;
    let sumPoints;
    let listNames;
    let found;
    let answerSelected;
    let actualTime;
    btnSend.disabled = true;


    btnStart.addEventListener('click', onStart);

    function onStart() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.remove('invisible');
        i = 0;
        displayQuestions(poolOfQuestions);
        actualTime = setInterval(refreshQuestionTimer, 1000);
    }


    function displayQuestions() {
        if (i < poolOfQuestions.length) {
            boxQuestions.innerHTML =
                `<div class="questionBox" id="${poolOfQuestions[i].id}">${poolOfQuestions[i].question}</div>`;
            for (let x = 0; x < poolOfQuestions[i].answers.length; x++) {
                boxQuestions.innerHTML +=
                    `<div class="checkboxBox">
                        <input type="radio" id="${poolOfQuestions[i].answers[x].id}" name="options" class="answer" value="${poolOfQuestions[i].answers[x].answer}"/>
                        <label for="${poolOfQuestions[i].answers[x].id}">${poolOfQuestions[i].answers[x].answer}</label>
                    </div>`;
            }
            i++;
            msg.innerHTML = '';
        } else {
            nameBox.classList.toggle('invisible');
            btnSend.disabled = true;
            stopTimer();
        }
    }


    function refreshQuestionTimer() {
        seconds++;
        timer.innerHTML = `${seconds}`;
        let timeLimitPerQuestion = 20;
        let pointsToBeDecrease = 3;
        if (seconds === timeLimitPerQuestion) {
            seconds = 0;
            displayQuestions();
            totalPoints -= pointsToBeDecrease;
            console.log(totalPoints);
            printScoreUIRealTime();
        }
        enableButtonWhenAnswerSelected();
    }

    function enableButtonWhenAnswerSelected() {
        btnSend.disabled = true;
        const allAnswers = document.querySelectorAll('.answer');
        for (let i = 0; i < allAnswers.length; i++) {
            if (allAnswers[i].checked) {
                btnSend.disabled = false;
            }
        }
    }

    btnSend.addEventListener('click', readUserAnswer);
    btnSend.addEventListener('click', displayQuestions);

    function readUserAnswer() {
        const allAnswers = document.querySelectorAll('.answer');

        for (let i = 0; i < allAnswers.length; i++) {
            if (allAnswers[i].checked) {
                answerSelected = allAnswers[i];
            }
        }
        found = poolOfQuestions.find(function (question) {
            const questionBox = document.querySelector('.questionBox');
            if (question.id === parseInt(questionBox.id)) {
                return question;
            }
        });
        let pickedAnswer = found.answers[answerSelected.id];
        checkAnswerCorrectOrIncorrect(pickedAnswer);
    }

    function printMessage(message) {
        msg.innerHTML = `<h3> ${message} </h3>`;
    }

    function updateScoreIfIsIncorrect() {
        if (seconds <= 10) totalPoints -= 1;
        else totalPoints -= 2;
    }

    function updateScoreIfIsCorrect() {
        if (seconds <= 2) totalPoints += 2;
        else if (seconds <= 10) totalPoints += 1;
    }

    function checkAnswerCorrectOrIncorrect(pickedAnswer) {
        if (pickedAnswer.isCorrect) {
            printMessage("¡Correcta!");
            updateScoreIfIsCorrect();
        }
        else {
            printMessage("¡Incorrecto!");
            updateScoreIfIsIncorrect();
        }
        printScoreUIRealTime();
        seconds = 0;
    }


    function printScoreUIRealTime() {
        scoreUI.innerHTML = ` ${totalPoints} puntos`
    }


    btnSave.addEventListener('click', onSave);

    function onSave() {
        saveScoreAndName();
        printScoreAndName();
        resetTimeAndPoints();
        hideButtonsAndBoxes();
    }

    let score = {
        names:
            [],
        points:
            []
    };

    function saveScoreAndName() {
        let name = document.querySelector('#inputNameId').value;
        score.names.push(name);
        listNames = score.names;
        console.log(listNames);
        score.points.push(totalPoints);
        sumPoints = score.points;
        console.log(sumPoints);
    }

    function printScoreAndName() {
        let scoreList = document.querySelector('.list');
        let add = '';
        for (let i = 0; i < listNames.length; i++) {
            add +=
                `<li class="eachBoxPlayer">${listNames[i]}-
                <div class="actualPoints">${sumPoints[i]}puntos</div>
            </li>`;
        }
        scoreList.innerHTML = add;
    }

    function stopTimer() {
        seconds = 0;
        clearInterval(actualTime);
    }

    function resetTimeAndPoints() {
        totalPoints = 0;
        printScoreUIRealTime();
        stopTimer();
        timer.innerHTML = '';
    }

    function hideButtonsAndBoxes() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.add('invisible');
        nameBox.classList.add('invisible');
        msg.innerHTML = '';
    }

    return{
        displayQuestions,
        start,
        checkAnswerCorrectOrIncorrect
    }
}
