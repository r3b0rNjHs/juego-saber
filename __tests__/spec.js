const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const chai = require('chai');
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
       loadTemplate('../templates/index.html', function(text){
           document.body.innerHTML = text;
           done();
       });
   });

   it('loads the markup', function(){
       expect(
           document.getElementsByClassName('btnStart'))
           .not.toBeNull();
   });
    it('btnStart hide when is clicked', function(){
        let buttonStart = document.getElementById('buttonStart');
        console.log(buttonStart.classList.toggle('invisible'));
        buttonStart.click();

        expect(
            buttonStart.classList.contains('invisible'))
            .toBeTruthy();
    });
});