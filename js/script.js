let practiceSets = {
    1: {
        questionBank: {
            1: {'ques': 'A motorboat, whose speed in 15 km/hr in still water goes 30 km downstream and comes back in a total of 4 hours 30 minutes. The speed of the stream (in km/hr) is:',
                'options': ['123', '127', '235', '350'],
                'solution': '../videos/video1.mp4'
            },
            2: {'ques': 'In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit?',
            'options': ['30%', '70%', '100%', '250%'],
            'solution': '../videos/video3.mp4'
            },
            3: {'ques': 'A boat running downstream covers a distance of 16 km in 2 hours while for covering the same distance upstream, it takes 4 hours. What is the speed of the boat in still water?',
            'options': ['3 km/h', '6 km/h', '8 km/h', '12 km/h'],
            'solution': '../videos/video2.mp4'
            },
        },
        answerKey: {
            1: 'B',
            2: 'B',
            3: 'A',
        }
    },
    2: {
        questionBank: {
            1: {'ques': 'With the following details given about a binary tree, find out the maximum number of nodes in the given tree. Height of the root is considered as 0.',
                'options': ['63', '62', '64', '23'],
                'solution': '../videos/video4.mp4'
            },
            2: {'ques': 'Which of the following is the correct topological ordering of the given graph?',
            'options': ['2', '22222', '11', '1'],
            'solution': '../videos/video5.mp4'
            },
            3: {'ques': 'What is the optimal way to store details of n nodes each having 2 children?',
            'options': ['1D Array', 'Array of Linked List', 'Linked List', '2D Array'],
            'solution': '../videos/video6.mp4'
            },
        },
        answerKey: {
            1: 'C',
            2: 'D',
            3: 'A',
        }
    }
};

let currQuestionID = 0;

let url = location.href;
let currPracticeSet = Number(url[url.length-1]); // currPracticeSet is a number
document.title = `Quiz | Practice Set - ${currPracticeSet}`;

let totalQuestions = 2;

const ps = new PerfectScrollbar('#container', {
    wheelSpeed: 0.5
});

loadAndExecute(sendText, 2000); 

function loadAndExecute(fun, delay) {
    setTimeout(function() {
        let fiveDots = $(`<div class="five-dots">
        <div class="bounce-dot-1">.</div>
        <div class="bounce-dot-2">.</div>
            <div class="bounce-dot-1">.</div>
            <div class="bounce-dot-2">.</div>
            <div class="bounce-dot-1">.</div>
            </div>`);
            
            $('#container').append(fiveDots);
            
            setTimeout(fun, delay);
        }, 1000);
}

function sendText() {
    $('.five-dots').remove();
    let txt = $(`<div class="preset-title">Here's your first question.</div>`);
    $('#container').append(txt);

    loadAndExecute(addQuestion, 2000); // an example of method overloading!
}

function addQuestion() {
    $('.five-dots').remove();
    
    currQuestionID++;

    if(currQuestionID > totalQuestions)
    {
        endQuiz();
        return;
    }

    // fetch from DB and make question
    let question = $(`<div class="question" id="q${currQuestionID}">
        <div class="question-text">${practiceSets[currPracticeSet]['questionBank'][currQuestionID].ques}</div>
        <div class="options">
            <div class="option" id="option-1"><div class="option-button">A</div>${practiceSets[currPracticeSet]['questionBank'][currQuestionID].options[0]}</div>
            <div class="option" id="option-2"><div class="option-button">B</div>${practiceSets[currPracticeSet]['questionBank'][currQuestionID].options[1]}</div>
            <div class="option" id="option-3"><div class="option-button">C</div>${practiceSets[currPracticeSet]['questionBank'][currQuestionID].options[2]}</div>
            <div class="option" id="option-4"><div class="option-button">D</div>${practiceSets[currPracticeSet]['questionBank'][currQuestionID].options[3]}</div>
        </div>
    </div>`);

    $('#container').append(question);
    littleScroll();

    let selector = `#q${currQuestionID} .options .option`; // CSS selectors! -> Selects all elements with name2 that is a descendant of an element with name1
    $(selector).click(function() {
         
        $(this).children().css({'background-color': 'rgb(236,88,83)', 'color': 'white'});
        $(selector).unbind('click'); // remove event listeners
        
        let userImg = $('<img id="user-avatar" src="../images/user.png" />');
        $('#container').append(userImg);
        scrollWithDelay(1100);

        let selectedChoice = $(this).children().text();
        if(selectedChoice == practiceSets[currPracticeSet]['answerKey'][currQuestionID]) // if user gives correct answer
        {
            loadAndExecute(sendCongratulations, 1500);
        }
        else 
        {
            loadAndExecute(sendWrongAnswer, 1500);
        }
    });
}

function sendCongratulations() {
    $('.five-dots').remove();
    let congrats = $(`<div class="preset-title">Congratulations! That's indeed the right answer. <br> <br> Do you want to check the video solution?</div>
        <div class="buttons" id="b${currQuestionID}">
        <div class="yes-button">Yes, please</div>
        <div class="no-button">No, I'm good</div>
    </div>`);
    $('#container').append(congrats);
    
    // add event listeners on btns
    let yes_selector = `#b${currQuestionID} .yes-button`;
    $(yes_selector).click(function() {
        let robotImg = $(`<img id="robot-avatar" style="margin-top: 2rem;" src="../images/dexter.png" />`);
        $('#container').append(robotImg);
        littleScroll();
        loadAndExecute(playSolutionVideo, 500);
        $(yes_selector).unbind('click');
        $(no_selector).unbind('click');
    });

    let no_selector = `#b${currQuestionID} .no-button`;
    $(no_selector).click(function() {
        let str = currQuestionID == totalQuestions ? "And that brings us to an end in this practice set of General Aptitude MCQs. See you in the next one!<br><br>Cheers!" : "Let's move ahead.";
        let txt = $(`<img id="robot-avatar" style="margin-top: 2rem;" src="../images/dexter.png" />
        <div class="preset-title">${str}</div>`);
        $('#container').append(txt);
        scrollWithDelay(0);
        loadAndExecute(addQuestion, 2000);
        $(yes_selector).unbind('click');
        $(no_selector).unbind('click');
    });
}

function scrollWithDelay(t) { // function can be used to introduce delay to scroll event
    setTimeout(() => {
        document.querySelector('#container').scrollBy({ 
            top: 600, // could be negative value
            left: 0, 
            behavior: 'smooth' 
        });
    }, t);
}

function littleScroll() {
    document.querySelector('#container').scrollBy({ // little scroll
        top: 300, // could be negative value
        left: 0, 
        behavior: 'smooth' 
    });
}

function sendWrongAnswer() {
    $('.five-dots').remove();
    let txt = $(`<div class="preset-title">Oops, that's the wrong answer! No worries - let's check out the right answer through this video solution.</div>`);
    $('#container').append(txt);
    
    loadAndExecute(playSolutionVideo, 1500);
}

function playSolutionVideo() {
    $('.five-dots').remove();
    
    video = document.createElement('video');
    video.src = practiceSets[currPracticeSet].questionBank[currQuestionID].solution;
    video.controls = true;
    
    scrollWithDelay(200);
    $('#container').append(video);

    $(video).bind('ended', function() {
        let str = currQuestionID == totalQuestions ? "And that brings us to an end in this practice set of General Aptitude MCQs. See you in the next one!<br><br>Cheers!" : "Let's move ahead.";
        let txt = $(`<img id="robot-avatar" style="margin-top: 2rem;" src="../images/dexter.png" />
        <div class="preset-title">${str}</div>`);
        $('#container').append(txt);
        scrollWithDelay(0);
        loadAndExecute(addQuestion, 2000);

        $(video).unbind('ended'); // to prevent multiple endings
    });
}

function endQuiz() {
    let nextAction;
    if(practiceSets[currPracticeSet+1] === undefined)
    {
        nextAction = $(`<div class="action-buttons">
            <div class="retake-btn" style="margin-top: 5rem;">Retake this lesson</div>
        </div>`);
    }
    else 
    {
        nextAction = $(`<div class="end-title">Next lesson: Practice Set - ${currPracticeSet+1}</div>
        <div class="action-buttons">
            <div class="retake-btn">Retake this lesson</div>
            <div class="next-btn">Go to next lesson</div>
        </div>`);
    }

    $('#container').append(nextAction);

    $('.retake-btn').click(() => location.reload());
    $('.next-btn').click(() => location.assign(url.substring(0, url.length-1) + (currPracticeSet+1)));
}

$('.side-bar-btn').click(function() {
    let sideBar = $(`<div class="side-bar">
    <div class="side-bar-title">
        <div class="material-icons side-bar-cancel-btn">highlight_off</div>
        General Aptitude
    </div>
        <div class="practice-set" id="1">Practice Set - 1</div>
        <div class="practice-set" id="2">Practice Set - 2</div>
    </div>`);

    
    $('.main-container').append(sideBar);

    $(`#${currPracticeSet}`).addClass('selected');

    sideBar.animate({
        left: '0'
    },  350);

    $('.side-bar-cancel-btn').click(function() {
        sideBar.animate({
            left: '-50vw'
        },  350);
        setTimeout(() => sideBar.remove(), 450);
    });

    $('.practice-set').click(function() {
        let id = $(this).attr('id');
        $('.practice-set').removeClass('selected');
        $(this).addClass('selected');
        location.assign(url.substring(0, url.length-1) + id);
    });
});

$('.big-retake-btn').click(() => location.reload());

$('.logo').click(() => location.assign('../index.html'));