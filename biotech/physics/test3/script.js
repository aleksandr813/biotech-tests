document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkAnswers');
    const resultsDiv = document.getElementById('results');


    const correctAnswers = {
        q1: 'b', 
        q2: 'c', 
        q3: 'd', 
        q4: 'c', 
        q5: 'c', 
        q6: 'd', 
        q7: 'c', 
        q8: 'b', 
        q9: 'd', 
        q10: 'b'
    };

    checkButton.addEventListener('click', function() {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        for (let i = 1; i <= totalQuestions; i++) {
            const questionId = 'q' + i;
            const userAnswer = getUserAnswer(questionId);
            const isCorrect = checkAnswer(questionId, userAnswer);
            
            if (isCorrect) {
                score++;
            }
            
            highlightAnswers(questionId, isCorrect);
        }

        resultsDiv.innerHTML = `
            <div class="${score === totalQuestions ? 'correct' : 'incorrect'}">
                Правильных ответов: ${score} из ${totalQuestions}
            </div>
        `;
    });

    function getUserAnswer(questionId) {
        const input = document.querySelector(`input[name="${questionId}"]:checked`);
        return input ? input.value : null;
    }

    function checkAnswer(questionId, userAnswer) {
        return userAnswer === correctAnswers[questionId];
    }

    function highlightAnswers(questionId, isCorrect) {
        const inputs = document.querySelectorAll(`input[name="${questionId}"]`);
        
        inputs.forEach(input => {
            const label = input.nextElementSibling;
            
            if (input.value === correctAnswers[questionId]) {
                label.classList.add('correct-answer');
            } else if (input.checked) {
                label.classList.add('wrong-answer');
            }
        });
    }
});