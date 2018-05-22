var saberganar = saberganar || {};

saberganar.questionsNavigator = function (questions) {
    let nonVisitedQuestions = true;
    let questionsIndex = 0;

    function areThereNonVisitedQuestions() {
        return nonVisitedQuestions;
    }

    function resetQuestions() {
        questionsIndex = 0;
    }

    function goToNextQuestion() {
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
};
function moduleDefined() {
    return typeof(module) !== 'undefined';
}
if (moduleDefined()){
    module.exports = saberganar;
}
