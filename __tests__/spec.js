const fs = require('fs');
const path = require('path');
const chai = require('chai');
const start = require('../src/main');
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

describe("the game", function(){

   beforeEach(function(done){
       loadTemplate('../views/body.html', function(text){
           document.body.innerHTML = text;
           done();
       });
   });

   it('loads the markup', function(){
       expect(
           document.getElementsByClassName('btnStart'))
           .not.toBeNull();
   });
   xit('should press start button', function (done) {
        // This test is not going to work because jsdom does not implement
        // the MutationObserver object. It would work with a real browser.

        let buttonStart = document.getElementById('buttonStart');
        console.log(buttonStart.classList.toggle('invisible'));
        buttonStart.click();
        let questionsBox = document.getElementById('questions');
        var config = { attributes: true, childList: true };
        var callback = function(mutationsList) {
            let answer = document.getElementById('3');
            answer.click();
            let dale = document.getElementById('btn');
            dale.click();
            let score = document.getElementById('scoreUI');
            expect(score.innerText).toBe('2');
            done();
        };
        var observer = new MutationObserver(callback);
        observer.observe(questionsBox, config);
        observer.disconnect();
   });
    it('should hide btnStart when is clicked', function(){
        let buttonStart = document.getElementById('buttonStart');
        console.log(buttonStart.classList.toggle('invisible'));
        buttonStart.click();


        expect(
            buttonStart.classList.contains('invisible'))
            .toBeTruthy();
    });
    it('should update score', function () {
        let seconds = 1;
        expect(start().updateScoreIfIsCorrect(seconds)).toBe(2);
    });
    it('should press start button', function (done) {
        let buttonStart = document.getElementById('buttonStart');
        console.log(buttonStart.classList.toggle('invisible'));
        buttonStart.click();
        let questionsBox = document.getElementById('questions');
        var config = { attributes: true, childList: true };
        var callback = function(mutationsList) {
            let answer = document.getElementById('3');
            answer.click();
            let dale = document.getElementById('btn');
            dale.click();
            let score = document.getElementById('scoreUI');
            expect(score.innerText).toBe('2');
            done();
        };
        var observer = new MutationObserver(callback);
        observer.observe(questionsBox, config);
        observer.disconnect();

    });
});