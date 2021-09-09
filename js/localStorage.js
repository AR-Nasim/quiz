
const getCurrentName = () =>{
    let currentName = localStorage.getItem('currentName');
    currentName = JSON.parse(currentName);
    if(!currentName){
        return 'Unknown';
    }
    return currentName.currentName;
}

setCurrentName();

const getName = () =>{
    let previousNames = localStorage.getItem('name');
    previousNames = JSON.parse(previousNames);
    if (!previousNames) {
        return {};
    }
    return previousNames;
}

const getScore = () => {
    let previousScores = localStorage.getItem('score');
    previousScores = JSON.parse(previousScores);
    if (!previousScores) {
        return {};
    }
    return previousScores;
}

const storeScore = (marks, name) => {
    let currentName = {currentName: name};
    currentName = JSON.stringify(currentName);
    let participantName = getName();
    let quizScore = getScore();
    if (quizScore['score']) {
        const scoreArray = quizScore['score'];
        const nameArray = participantName['name'];
        
        if (scoreArray.length < 5) {
            for (let i = 0; i < scoreArray.length; i++) {
                const element = scoreArray[i];
                const element2 = nameArray[i];
                if (element < marks) {
                    scoreArray[i] = marks;
                    nameArray[i] = name;
                    name = element2;
                    marks = element;
                }
            }
            scoreArray.push(marks);
            nameArray.push(name);
            quizScore['score'] = scoreArray;
            participantName['name'] = nameArray;
        }
        else{
            for (let i = 0; i < 5; i++) {
                const element = scoreArray[i];
                const element2 = nameArray[i];
                if (element < marks) {
                    scoreArray[i] = marks;
                    nameArray[i] = name;
                    marks = element;
                    name = element2;
                }
            }
        }
    }
    else {
        quizScore['score'] = [marks];
        participantName['name'] = [name];
    }

    quizScore = JSON.stringify(quizScore);
    participantName = JSON.stringify(participantName);
    localStorage.setItem('score', quizScore);
    localStorage.setItem('name', participantName);
    localStorage.setItem('currentName', currentName);
}