document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkAnswers');
    const resultsDiv = document.getElementById('results');

    const correctAnswers = {
        q1: 'б', 
        q2: 'в',  
        q3: 'а',  
        q4: 'б',
        q5: 'в', 
        q6: 'б', 
        q7: 'а',  
        q8: 'б',  
        q9: 'в',  
        q10: 'б', 
        q11: 'а' 
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
        const selected = document.querySelector(`input[name="${questionId}"]:checked`);
        return selected ? selected.value : null;
    }

    function checkAnswer(questionId, userAnswer) {
        return userAnswer === correctAnswers[questionId];
    }

    function highlightAnswers(questionId, isCorrect) {
        const inputs = document.querySelectorAll(`input[name="${questionId}"]`);
        
        inputs.forEach(input => {
            const label = input.nextElementSibling;
            
            label.classList.remove('correct-answer', 'wrong-answer');
            
            if (input.value === correctAnswers[questionId]) {
                label.classList.add('correct-answer');
            } else if (input.checked) {
                label.classList.add('wrong-answer');
            }
        });
    }
});