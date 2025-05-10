document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('checkAnswers');
    const resultsDiv = document.getElementById('results');

    const correctAnswers = {
        q1: ['c', 'e'], 
        q2: 'd',       
        q3: 'c',
        q4: ['a', 'b', 'c', 'e', 'f', 'h', 'i'],
        q5: 'бгвдае',
        q6: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
        q7: 'бгав',
        q8: ['a', 'b', 'c', 'd', 'e', 'f'],
        q9: 'безёдижйгвак',
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
        if (questionId === 'q5' || questionId === 'q7' || questionId === 'q9') {
            const input = document.getElementById(questionId);
            return input.value.trim().toLowerCase();
        } else {
            const inputs = document.querySelectorAll(`input[name="${questionId}"]:checked`);
            if (inputs.length === 0) return null;
            
            if (inputs[0].type === 'radio') {
                return inputs[0].value;
            } else {
                return Array.from(inputs).map(input => input.value);
            }
        }
    }

    function checkAnswer(questionId, userAnswer) {
        const correct = correctAnswers[questionId];
        
        if (Array.isArray(correct)) {
            if (!userAnswer || !Array.isArray(userAnswer)) return false;
            if (userAnswer.length !== correct.length) return false;
            
            const sortedUser = userAnswer.slice().sort();
            const sortedCorrect = correct.slice().sort();
            
            return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
        } else {
            return userAnswer === correct;
        }
    }

    function highlightAnswers(questionId, isCorrect) {
        if (questionId === 'q5' || questionId === 'q7' || questionId === 'q9') {
            const input = document.getElementById(questionId);
            input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
        } else {
            const inputs = document.querySelectorAll(`input[name="${questionId}"]`);
            const correct = correctAnswers[questionId];
            
            inputs.forEach(input => {
                const label = input.nextElementSibling;
                
                if (Array.isArray(correct)) {
                    if (correct.includes(input.value)) {
                        label.classList.add('correct-answer');
                    } else if (input.checked) {
                        label.classList.add('wrong-answer');
                    }
                } else {
                    if (input.value === correct) {
                        label.classList.add('correct-answer');
                    } else if (input.checked) {
                        label.classList.add('wrong-answer');
                    }
                }
            });
        }
    }
});