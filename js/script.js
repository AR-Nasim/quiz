const questions = document.getElementById("question");
const options = document.getElementsByName("quiz-label");
const button = document.getElementsByClassName("button");
const main = document.getElementById("main");
const begin = document.getElementById("begin");
const result = document.getElementById("result");
const scoreBoard = document.getElementById("scores");
const questionNo = document.getElementById("question-no");
const finalResult = document.getElementById("final-result");
const feedback = document.getElementById("feedback");
const optA = document.getElementById("0");
const optB = document.getElementById("1");
const optC = document.getElementById("2");
const optD = document.getElementById("3");
let answer = [];
let marks = 0;
let i = 0;
let skips = 3;

const showResults = () => {
    scoreBoard.style.display = "none";
    main.style.display = "none";
    result.style.display = "block";
}

function questionGenerator(data) {
    if (i == 10) {
        showResults();
        if (!marks) {
            feedback.innerText = "Alas!\r\nEven your luck didn't help you!";
        }
        else if (marks >= 1 && marks <= 4) {
            feedback.innerText = "Ohh Dear!\r\nBetter luck next time.";
        }
        else if (marks >= 5 && marks <= 8) {
            feedback.innerText = "Good Job!\r\nYou've done well.";
        }
        else {
            feedback.innerText = "Congratulations!!\r\nYou've done a great job.";
        }
        finalResult.innerText = "Your Score: " + marks + "/10";
        storeScore(marks);
    }
    else {
        const element = data.results[i];
        questionNo.innerText = "Question No. " + (i + 1);
        questions.textContent = element.question;
        const correctOption = Math.round(Math.random() * 3) + 1;
        answer.push(correctOption);
        let j = 0;
        for (let k = 0; k < 4; k++) {
            if (k == correctOption - 1) {
                options[k].textContent = element.correct_answer;
            }
            else {
                options[k].textContent = element.incorrect_answers[j];
                j++;
            }
        }
        i++;
    }
}

function resultGenerator() {
    if (optA.checked) {
        if (answer[0] == 1) {
            marks++;
        }
        optA.checked = false;
    }
    else if (optB.checked) {
        if (answer[0] == 2) {
            marks++;
        }
        optB.checked = false;
    }
    else if (optC.checked) {
        if (answer[0] == 3) {
            marks++;
        }
        optC.checked = false;
    }
    else if (optD.checked) {
        if (answer[0] == 4) {
            marks++;
        }
        optD.checked = false;
    }
    else if (skips) {
        var r = confirm("Do you really wanna skip this question? You've " + skips + " questions to skip!");
        if (r == true) {
            skips--;
        } else {
            stopPropagation();
        }
    }
    else if (i != 10) {
        alert("You should've select an option!!");
        stopPropagation();
    }
    answer.shift();
}

const scores = () => {
    result.style.display = "none";
    scoreBoard.style.display = "block";
    const totalScoresObj = getScore();
    const totalScores = totalScoresObj.score;

    const scoreList = document.getElementById('score-list');
    scoreList.textContent = '';
    for (let i = 0; i < totalScores.length; i++) {
        const element = totalScores[i];
        const li = document.createElement('li');
        li.innerHTML = `${i + 1}. ${element}`;
        scoreList.appendChild(li);

    }
}

const reload = () => {
    location.reload();
}

fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple').
    then(res => res.json()).
    then(data => {
        button[0].addEventListener("click", () => {
            begin.style.display = "none";
            main.style.display = "block";
            questionGenerator(data);
        })
        button[1].addEventListener("click", () => {
            resultGenerator();
            questionGenerator(data);
        })
    })
