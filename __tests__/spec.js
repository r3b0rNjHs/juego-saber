const fs = require('fs');
const path = require('path');
const chai = require('chai');
const application = require('../src/main');
chai.expect();

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
        questionsNavigator = application().questionsNavigator(questions);
    });
    it('should test the current question', function () {
        questionsNavigator.goToNextQuestion();
        let question = questionsNavigator.currentQuestion();
        expect(questions).toContain(question);
    });
    it('should always be pointing to a question', function () {

        let question = questionsNavigator.currentQuestion();
        expect(questions).toContain(question);
    });
    it('should not repeat the last question', function () {
        questionsNavigator.goToNextQuestion();
        let question1 = questionsNavigator.currentQuestion();
        questionsNavigator.goToNextQuestion();
        let question2 = questionsNavigator.currentQuestion();
        questionsNavigator.goToNextQuestion();
        let question3 = questionsNavigator.currentQuestion();
        questionsNavigator.goToNextQuestion();
        expect(question1).not.toEqual(question2);
        expect(question2).not.toEqual(question3);
    });
});

xdescribe("the game", function(){
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
           app = application();
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

    function getQuestionTitle() {
        let questionTitle = document.querySelector('.question--title');
        return questionTitle;
    }

    function startGame() {
        let buttonStart = document.getElementById('start--button');
        buttonStart.click();
        let questionTitle = getQuestionTitle();
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
        let questionTitle = getQuestionTitle();
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