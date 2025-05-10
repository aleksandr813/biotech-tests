document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkAnswers');
    const resultsDiv = document.getElementById('results');

    const correctAnswers = {
        q1: 'c',
        q2: 'a',
        q3: 'b',
        q4: 'd',
        q5: 'b',
        q6: 'c', 
        q7: 'a',
        q8: 'a',
        q9: 'b',
        q10: 'a'
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
        console.log(`Question ${questionId}: user answer = ${userAnswer}, correct answer = ${correctAnswers[questionId]}`);
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


