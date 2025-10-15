let startBtn = document.querySelector('.startBtn');
let infoBox = document.querySelector('.infoBox');
let exitBtn = document.querySelector('.exitBtn');
let continueBtn = document.querySelector('.continueBtn');
let quizBox = document.querySelector('.QuizBox');
let questionText = document.querySelector('.questiontext');
let allOptions = document.querySelectorAll('.option');
let nextBtn = document.querySelector('.nextbtn');
let timeline = document.querySelector('.timeline');
let currentQuestionIndicator = document.querySelector('.currentQuestionIndicator');
let progressBar = document.querySelector('.progressBar');
let timeLineTitle = document.querySelector('.time-line-title');
let scoreText = document.querySelector('.scoreText');

let replayQuiz = document.querySelector('.replay-quiz');
let QuitQuiz = document.querySelector('.Quit-quiz');
let resultBox = document.querySelector('.result-box');

let currentQuestionIndex = 0;
let userScore = 0;

let timeLineInterval = null;
let progressBarInterval = null;

const TicIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
const crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

startBtn.addEventListener('click', () => {
    // we have to inject a class name to infoBox
    infoBox.classList.add('activeInfoBox');
    
});

exitBtn.addEventListener('click', () => {
    infoBox.classList.remove('activeInfoBox');
});

continueBtn.addEventListener('click', () => {
    infoBox.classList.remove('activeInfoBox');
    quizBox.classList.add('activeQuizBox');
    // here we need to start showing question
    showQuestion(currentQuestionIndex);
    handleTiming(15);
    handleprogressBar();
    timeLineTitle.innerText = 'Time left';
});

nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex <9) {
        currentQuestionIndex = currentQuestionIndex + 1;

        // reset the time
        // reset the progress bar
        handleTiming(15);
        handleprogressBar();

    showQuestion(currentQuestionIndex);
    nextBtn.classList.remove('active');
    timeLineTitle.innerText = '.Time Left';
    } else {
        // you reached the last question
        // you need to show result
        clearInterval(progressBarInterval);
        clearInterval(timeLineInterval);
        quizBox.classList.remove('activeQuizBox');
        resultBox.classList.add('activeResultBox');
        handleShowResult();
    }
});

QuitQuiz.addEventListener('click', () => {
    restart();
    resultBox.classList.remove('activeResultBox');
});

replayQuiz.addEventListener('click', () => {
     restart();
    resultBox.classList.remove('activeResultBox');
    quizBox.classList.add('activeQuizBox');
     showQuestion(currentQuestionIndex);
    handleTiming(15);
    handleprogressBar();
    timeLineTitle.innerText = 'Time left';

})


// function to show/render questions
const showQuestion = (index) => {
    questionText.innerText = '' + questions?.[index].numb +'. ' + questions?.[index].question;  

   for(let i=0; i<allOptions?.length; i++) {
    allOptions[i].innerText = questions?.[index].options?.[i];
    allOptions[i].classList.remove('correct');
    allOptions[i].classList.remove('incorrect');
    allOptions[i].classList.remove('disabled');
    
    if(index === 0) {
        allOptions[i]?.addEventListener('click', optionClickHandle);
    }
   }

   currentQuestionIndicator.innerText = index + 1;
};

const handleTiming = (time) => {
    clearInterval(timeLineInterval);
    timeline.innerText = time;
    let timeValue = time;
    timeLineInterval = setInterval(() => {
        timeValue--;

        if(timeValue < 10) {
            timeline.innerText = '0' + timeValue;
        } else {
            timeline.innerText = timeValue;
        }
        if(timeValue===0) {
            //you cross the time
            timeLineTitle.innerText = 'Time off';
            clearInterval(timeLineInterval);
            // make next button visible
            nextBtn.classList.add('active');
            // display correct answer
            const correctAnswer = questions[currentQuestionIndex].answer;
            for(let i=0; i<allOptions?.length; i++) {
            allOptions[i].classList.add('disabled');

            if( allOptions[i].innerText === correctAnswer) {
                 allOptions[i].classList.add('correct');
                allOptions[i].insertAdjacentHTML('beforeend', TicIcon);
            }
     }

        }

    }, 1000);

}

const handleprogressBar = () => {
    clearInterval(progressBarInterval);
    progressBar.style.width = '0%';
    let currentPercentage = 0;
    progressBarInterval  = setInterval (() => {
        currentPercentage += 1/15;
        progressBar.style.width = currentPercentage + '%';

        if(currentPercentage >= 100) {
            clearInterval(progressBarInterval);
        }
    }, 10);
};

const optionClickHandle = (e) => {
    console.log(e);
    clearInterval(progressBarInterval);
    clearInterval(timeLineInterval);
    nextBtn.classList.add('active');
    const userAnswer = e.target.innerText;
    const correctAnswer = questions[currentQuestionIndex].answer;
    console.log(correctAnswer, userAnswer);

    if(userAnswer === correctAnswer) {
        userScore++;
        e.target.classList.add('correct');
        e.target.insertAdjacentHTML('beforeend', TicIcon);
    } else {
        // wrong answer
        // mark user response as wrong
        // traverse and find correct answer
        // and then mark it as correct
        e.target.classList.add('incorrect');
        e.target.insertAdjacentHTML('beforeend', crossIcon);

         for(let i=0; i<allOptions?.length; i++) {
            if(allOptions[i].innerText === correctAnswer) {
                
            } 
        }
    }

     for(let i=0; i<allOptions?.length; i++) {
            allOptions[i].classList.add('disabled');

            if(userAnswer !== correctAnswer && allOptions[i].innerText === correctAnswer) {
                 allOptions[i].classList.add('correct');
                allOptions[i].insertAdjacentHTML('beforeend', TicIcon);
            }
     }

};


const restart = () => {
    clearInterval(progressBarInterval);
    clearInterval(timeLineInterval);
    currentQuestionIndex = 0;
    userScore = 0;
    timeLineTitle.innerText = 'Time left';

}

const handleShowResult = () => {
    scoreText.innerHTML = `
    <span>
        and nice😎, you got
            <p>${userScore}</p>
            out of 
            <p>${questions?.length}</p>
     </span>`;
  
}