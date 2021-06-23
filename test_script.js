const ps = new PerfectScrollbar('#scroll', {
    wheelSpeed: 0.5
});

// --------------------------------------------------------------------

let currActiveQues = 1;

// --------------------------------------------------------------------

// Our DB is an array of objects consisting of question info
const DB = [{
    'ques': 'You need to insert a digital signature. Determine which tab and group should be selected from the given options?',
    'options': ['View, Signature', 'Home, Editing', 'Insert, Text', 'Review, Proof'],
    'answer': 'C'
},
{
    'ques': 'Question 2',
    'options': ['tree', 'll', 'binary tree', 'graph'],
    'answer': 'A'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'You need to insert a digital signature. Determine which tab and group should be selected from the given options?',
    'options': ['View, Signature', 'Home, Editing', 'Insert, Text', 'Review, Proof'],
    'answer': 'C'
},
{
    'ques': 'Question 2',
    'options': ['tree', 'll', 'binary tree', 'graph'],
    'answer': 'A'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'You need to insert a digital signature. Determine which tab and group should be selected from the given options?',
    'options': ['View, Signature', 'Home, Editing', 'Insert, Text', 'Review, Proof'],
    'answer': 'C'
},
{
    'ques': 'Question 2',
    'options': ['tree', 'll', 'binary tree', 'graph'],
    'answer': 'A'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'You need to insert a digital signature. Determine which tab and group should be selected from the given options?',
    'options': ['View, Signature', 'Home, Editing', 'Insert, Text', 'Review, Proof'],
    'answer': 'C'
},
{
    'ques': 'Question 2',
    'options': ['tree', 'll', 'binary tree', 'graph'],
    'answer': 'A'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'You need to insert a digital signature. Determine which tab and group should be selected from the given options?',
    'options': ['View, Signature', 'Home, Editing', 'Insert, Text', 'Review, Proof'],
    'answer': 'C'
},
{
    'ques': 'Question 2',
    'options': ['tree', 'll', 'binary tree', 'graph'],
    'answer': 'A'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
},
{
    'ques': 'Question 3',
    'options': ['window', 'this', 'spread', 'ES6'],
    'answer': 'B'
}];

// For storing the state (active, attempted, unattempted, review), we use IndexedDB so that it does not changes on refreshing
let dbAccess;
let request = indexedDB.open('Question States', 1);

request.addEventListener('success', function() {
    dbAccess = request.result;

    // Do this after loading DB
    displayQuestionNos();
    loadQuestion(0);
});

request.addEventListener('error', function() {
    alert('Some error occured with the database! Please contact support team.');
});

request.addEventListener('upgradeneeded', function() {
    let db = request.result;
    db.createObjectStore('states', { keyPath : 'mId' });
});

// --------------------------------------------------------------------

let countDownDate = new Date("June 22, 2021 18:45:00").getTime();

let timeOut = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.timer').innerHTML = minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(timeOut);
        document.querySelector('.timer').innerHTML = 'Time Over';
    }
}, 1000);

// --------------------------------------------------------------------


// TODO: toggle functionality
$('.bookmark-icon').click(function() { // Add question for review
    if(!$(this).hasClass('bookmarked'))
    {
        $(this).text('bookmark');
        $(this).addClass('bookmarked');

        updateState(currActiveQues, 3);
    }
    else 
    {
        $(this).text('bookmark_border');
        $(this).removeClass('bookmarked');

        unbookmark();
    }
});

function unbookmark() {
    let statesObjectStore = dbAccess.transaction('states', 'readwrite').objectStore('states');
    let req = statesObjectStore.get(currActiveQues);

    req.onerror = function(e) {
        alert('Some error occured with the database! Please contact support team.');
    };

    req.onsuccess = function(e) {
        let data = e.target.result;
        data.state = 1;
        statesObjectStore.put(data);
        let el = $(`#q${currActiveQues}`);
        el.removeClass('review-label');
        el.addClass('qno-selected');
    }
}

$('.option').click(function() {
    // first remove from already applied ones
    $('.option-icon').text('radio_button_unchecked');
    $('.selected').removeClass('selected');

    // then add
    if(!$(this).hasClass('selected'))
    {
        $(this).addClass('selected');
        $($(this).children()[0]).text('radio_button_checked');

        let id = $(`.selected .option-text`).attr('id'); // A, B, C, D
        updateSelectedOption(currActiveQues, id);

        let isClearPresent = $('.clear-options').length == 0 ? false : true;

        if(!isClearPresent)
        {
            addClearButton();
        }
    }
});

function addClearButton() {
    let clear = $(`<div class="clear-options">
        <div class="material-icons">restart_alt</div>
    </div>`);
    $('#container').append(clear);


    $('.clear-options').click(() => {
        clear.remove();

        updateSelectedOption(currActiveQues, '');

        $('.option-icon').text('radio_button_unchecked');
        $('.selected').removeClass('selected');
    });

    // For handling animations of scaling on CIRCLE BTNS
    $('.clear-options').on('mouseenter', function() {
        $(this).removeClass('animation-sizedown');
        setTimeout(() => $(this).addClass('enlarged-circle-btn'), 500);
    });

    $('.clear-options').on('mouseleave', function() {
        setTimeout(() => $(this).removeClass('enlarged-circle-btn'), 500);
        $(this).addClass('animation-sizedown');
    });
}

function updateSelectedOption(qno, choice) {
    let tx = dbAccess.transaction('states', 'readwrite');
    let statesObjectStore = tx.objectStore('states');
    
    let req = statesObjectStore.get(qno);

    req.onerror = function(e) {
        alert('Some error occured with the database! Please contact support team.');
    };

    req.onsuccess = function(e) {
        let data = e.target.result;
        data.selectedOption = choice;
        statesObjectStore.put(data);
    }
}

function loadQuestion(idx) {
    $('.question-text').text(DB[idx].ques);
    $('#A').text(DB[idx].options[0]);
    $('#B').text(DB[idx].options[1]);
    $('#C').text(DB[idx].options[2]);
    $('#D').text(DB[idx].options[3]);

    // LOAD SELECTED CHOICE FROM DB
    let tx = dbAccess.transaction('states', 'readwrite');
    let statesObjectStore = tx.objectStore('states');

    let req = statesObjectStore.get(idx+1);

    req.onerror = function(e) {
        alert('Some error occured with the database! Please contact support team.');
    };

    req.onsuccess = function(e) {
        let data =  e.target.result;
        let choice = data.selectedOption;

        $('.option-icon').text('radio_button_unchecked');
        $('.selected').removeClass('selected');
        $('.clear-options').remove();
        if(choice != '')
        {
            $(`#${choice}`).parent().addClass('selected');
            $(`#${choice}`).prev().text('radio_button_checked');
            addClearButton();
        }
    }
}

function displayQuestionNos() {
    // Add question list items
    let list_item_str = '';
    $('.question-list-container').append(`<div class="question-no qno-selected" id="q1">1</div>`);
    for(let i=2; i<=30; i++) 
    {
        list_item_str += `<div class="question-no" id="q${i}">${i}</div>`;
    }
    let list = $(`${list_item_str}`);
    $('.question-list-container').append(list);
    
    let tx = dbAccess.transaction('states', 'readwrite');
    let statesObjectStore = tx.objectStore('states');
    
    for(let i=1; i<=30; i++)
    {
        let data = {
            mId: i,
            state: 0,
            selectedOption: '',
        }
        statesObjectStore.add(data);

        $(`#q${i}`).click(function() {
            let str = $(this).text();
            let idx = Number(str) - 1;
            
            loadQuestion(idx); // question, options, selectedChoice
            updateState(currActiveQues, 0, this);
            updateState(idx+1, 1, this);
            currActiveQues = idx+1;
        });

        loadStatesFromDB(i);
    }

    updateState(1, 1, document.querySelector(`#q1`));
}

function loadStatesFromDB(qno) {
    let tx = dbAccess.transaction('states', 'readwrite');
    let statesObjectStore = tx.objectStore('states');

    let req = statesObjectStore.get(qno);

    req.onerror = function(e) {
        alert('Some error occured with the database! Please contact support team.');
    };

    req.onsuccess = function(e) {
        let data =  e.target.result;
        let state = data.state;

        if(state == 0)
        {
            // nothing to do
        }
        else if(state == 1)
        {
            data.state = 0;
            statesObjectStore.put(data);
        }
        else if(state == 2)
        {
            // do
        }
        else if(state == 3)
        {
            $(`#q${qno}`).addClass('review-label');
        }
    }
}

// Side note: refresh the DB in IndexedDB to see changes
function updateState(qno, state, ele=document.querySelector(`#q${currActiveQues}`)) {
    let tx = dbAccess.transaction('states', 'readwrite');
    let statesObjectStore = tx.objectStore('states');

    let req = statesObjectStore.get(qno);

    req.onerror = function(e) {
        alert('Some error occured with the database! Please contact support team.');
    };

    let el = $(ele);
    req.onsuccess = function(e) {
        let data = e.target.result;
        if(data.state != 3) data.state = state; // update state here 0->unattempted 1->active 2->attempted 3->review

        statesObjectStore.put(data);

        if(data.state == 0)
        {   
            $('.qno-selected').removeClass('qno-selected');
        }
        else if(data.state == 1)
        {   
            if(el.hasClass('review-label'))
            {
                el.removeClass('review-label');
                
                let bookmarkicon = $('.bookmark-icon');
                bookmarkicon.text('bookmark_border');
                bookmarkicon.removeClass('bookmarked');
            } 
            el.addClass('qno-selected');
        }
        else if(data.state == 2)
        {
            // do
        }
        else if(data.state == 3)
        {
            $('.qno-selected').removeClass('qno-selected');
            $(ele).addClass('review-label');

            let bookmarkicon = $('.bookmark-icon');
            bookmarkicon.text('bookmark');
            bookmarkicon.addClass('bookmarked');
        }
    }
}