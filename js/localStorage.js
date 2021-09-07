

const getScore = () => {
    let previousScores = localStorage.getItem('score');
    previousScores = JSON.parse(previousScores);
    if (!previousScores) {
        return {};
    }
    return previousScores;
}

const storeScore = marks => {
    let quizScore = getScore();
    console.log(quizScore);
    if (quizScore['score']) {
        const scoreArray = quizScore['score'];
        scoreArray.sort(function compare(num1, num2) {
            return num1 - num2;
        });
        scoreArray.reverse();
        if (scoreArray.length < 5) {
            for (let i = 0; i < scoreArray.length; i++) {
                const element = scoreArray[i];
                if (element < marks) {
                    scoreArray[i] = marks;
                    marks = element;
                }
            }
            scoreArray.push(marks);
            quizScore['score'] = scoreArray;
        }
        else{
            for (let i = 0; i < 5; i++) {
                const element = scoreArray[i];
                if (element < marks) {
                    scoreArray[i] = marks;
                    marks = element;
                }
            }
        }
    }
    else {
        quizScore['score'] = [marks];
    }
    quizScore = JSON.stringify(quizScore);
    localStorage.setItem('score', quizScore);
}