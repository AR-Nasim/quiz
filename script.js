fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple').
then(res => res.json()).
then(data => {
    console.log(data);
})