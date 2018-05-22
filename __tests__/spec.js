const fs = require('fs');
const path = require('path');
const chai = require('chai');
const saberganarGame = require('../src/main');
const saberganarQuestionNavigator = require('../src/questionsNavigator');
//const expect = chai.expect();

function loadTemplate(filepath, onLoad) {
    const filePath = path.join(__dirname, filepath);
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            onLoad(data);
        } else {
            console.log(err);
        }
    });
}


describe("the questions navigator",() => {
    let questions = [
        {
            id: 22,
            title: '¿Cuántos años tiene María?',
            answers: [
                {id: 0, answer: '25'},
                {id: 1, answer: '33'},
                {id: 2, answer: '37'}
            ],
            correctAnswer: {id: 1}
        },
        {
            id: 30,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                {id: 0, answer: 'Lusaka'},
                {id: 1, answer: 'Harare'},
                {id: 2, answer: 'Madrid'}
            ],
            correctAnswer: {id: 0}
        }];
    let questionsNavigator;

    beforeEach(function () {
        questionsNavigator = saberganarQuestionNavigator.questionsNavigator(questions);
    });
    it('should test the current question', function () {
        let question = questionsNavigator.getNextQuestion();
        expect(questions).toContain(question);
    });
    it('should always be pointing to a question', function () {

        let question = questionsNavigator.getNextQuestion();
        expect(questions).toContain(question);
    });
    it('should not repeat the last question', function () {
        let question1 = questionsNavigator.getNextQuestion();
        let question2 = questionsNavigator.getNextQuestion();
        let question3 = questionsNavigator.getNextQuestion();
        expect(question1).not.toEqual(question2);
        expect(question2).not.toEqual(question3);
    });

    it('should knows when the questions are all visited', function () {
        questionsNavigator.getNextQuestion();
        expect(questionsNavigator.areThereNonVisitedQuestions()).toBeTruthy();
        questionsNavigator.getNextQuestion();
        expect(questionsNavigator.areThereNonVisitedQuestions()).toBeFalsy();
    });
});

describe("the game", function(){
   let app;
   let questions = [
       {
           id: 22,
           title: '¿Cuántos años tiene María?',
           answers: [
               {id: 0, answer: '25'},
               {id: 1, answer: '33'},
               {id: 2, answer: '37'}
           ],
           correctAnswer: {id: 1}
       },
       {
           id: 30,
           title: '¿Cuál es la capital de Zambia?',
           answers: [
               {id: 0, answer: 'Lusaka'},
               {id: 1, answer: 'Harare'},
               {id: 2, answer: 'Madrid'}
           ],
           correctAnswer: {id: 0}
       }];
   beforeEach(function(done){
       loadTemplate('../views/body.html', function(text){
           document.body.innerHTML = text;
           app = saberganarGame.game(saberganarQuestionNavigator.questionsNavigator);
           app.setServerData(questions);
           app.start();
           done();
       });
   });

   it('loads the markup', function(){
       expect(
           document.getElementById('start--button'))
           .not.toBeNull();
   });

    function getNextQuestionTitle() {
        return document.querySelector('.question--title');
    }

    function startGame() {
        let buttonStart = document.getElementById('start--button');
        buttonStart.click();
        let questionTitle = getNextQuestionTitle();
        expect(Number(questionTitle.id)).toEqual(questions[0].id);
        return questionTitle;
    }

    function selectFirstAnswer() {
        let firstAnswer = document.getElementsByTagName('input')[0];
        firstAnswer.click();
        expect(firstAnswer.checked).toBe(true);
    }

    function goToNextQuestion() {
        let nextQuestionButton = document.getElementById('next--question--button');
        nextQuestionButton.click();
    }

    function expectThatSecondQuestionIsRendered() {
        let questionTitle = getNextQuestionTitle();
        expect(Number(questionTitle.id)).toEqual(questions[1].id);
    }

    function startAndAnswerQuestions() {
        startGame();
        selectFirstAnswer();
        goToNextQuestion();
    }

    it('answers a question', function () {
        startAndAnswerQuestions();
        expectThatSecondQuestionIsRendered();
   });

    function assertThatTimeIsReset() {
        const clock = document.querySelector(".clock");
        expect(parseInt(clock.innerHTML)).toEqual(9);
    }

    it('restart timer when new Question is displayed', function () {
        startAndAnswerQuestions();
        assertThatTimeIsReset();
    });
});




/*const counterInDOM = document.querySelector(".clock");
console.log(4);
setTimeout(function () {
    console.log(5);
    expect(parseInt(counterInDOM.innerHTML)).toEqual(9);
    console.log(6);
    done();
    console.log(7);
}, 1000);
console.log(8);*/