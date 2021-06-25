const ps = new PerfectScrollbar('#scroll', {
    wheelSpeed: 0.5
});

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
    'ques': 'Last Question',
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
    initializeDB();
    loadOnRefresh();
});

request.addEventListener('error', function() {
    alert('Some error occured with the database! Please contact support team.');
});

request.addEventListener('upgradeneeded', function() {
    let db = request.result;
    db.createObjectStore('states', { keyPath : 'qId' });
});

// --------------------------------------------------------------------

let countDownDate = new Date("June 24, 2021 13:40:00").getTime();

let timeOut = setInterval(function() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector('.timer').innerHTML = minutes + "m " + seconds + "s ";

    if (distance < 0) {
        clearInterval(timeOut);
        document.querySelector('.timer').innerHTML = 'Time Over';
    }
}, 1000);

// --------------------------------------------------------------------

let currActiveQues = 1;

function displayQuestionNos() {
    let list_item_str = '';
    $('.question-list-container').append(`<div class="question-no qno-selected" id="q1">1</div>`);
    for(let i=2; i<=30; i++) 
    {
        list_item_str += `<div class="question-no" id="q${i}">${i}</div>`;
    }
    let list = $(`${list_item_str}`);
    $('.question-list-container').append(list);
}

function initializeDB() {
    let obj = dbAccess.transaction('states', 'readwrite').objectStore('states');

    for(let i = 1; i <= 30; i++)
    {
        let data = {
            qId: i,
            state: 0,
            selectedOption: '', 
        }

        obj.add(data);
    }

    for(let i = 1; i <= 30; i++)
    {
        // attach event listener to every question
        $(`#q${i}`).click(function() {
            let quesNo = Number($(this).text());

            $('.qno-selected').removeClass('qno-selected');
            $(this).addClass('qno-selected');
            currActiveQues = quesNo;

            loadQuestion(quesNo);
        });
    }

    loadQuestion(1);
}

function loadQuestion(qId) {
    let idx = qId - 1;
    $('.question-text').text(DB[idx].ques);
    $('#A').text(DB[idx].options[0]);
    $('#B').text(DB[idx].options[1]);
    $('#C').text(DB[idx].options[2]);
    $('#D').text(DB[idx].options[3]);

    $('.bookmark-icon').removeClass('bookmarked');
    $('.bookmark-icon').text('bookmark_border');
    $('.selected').removeClass('selected');
    $('.option-icon').text('radio_button_unchecked');
    $('.clear-options').remove();

    loadQuestion_Helper(qId);

    // For displaying buttons
    if(qId == 1) 
    {
        $('.go-back').hide();
        $('.go-next').show();
    }
    else if(qId == DB.length) 
    {
        $('.go-next').hide();
        $('.go-back').show();
    }
    else 
    {
        $('.go-back').show();
        $('.go-next').show();
    }
}

function loadQuestion_Helper(qId) {
    let p = loadFromDB(qId); 
    p.then(function([st, op]) {
        if(st == 1 || st == 3) // under review
        {
            document.querySelector('.bookmark-icon').innerText = 'bookmark';
            document.querySelector('.bookmark-icon').classList.add('bookmarked');
        }

        if(op === '') return;

        document.getElementById(`${op}`).parentNode.classList.add('selected');
        document.getElementById(`${op}`).previousElementSibling.innerText = 'radio_button_checked';
        addClearButton();
    });
}

async function loadFromDB(qId) {
    return new Promise((resolve) => {
        let obj = dbAccess.transaction('states', 'readwrite').objectStore('states');
        let req = obj.get(qId);
        req.onsuccess = function(e) {
            let data = e.target.result;
            resolve([data.state, data.selectedOption]);
        }
    });
}

function updateInDB_State(qId, s) {
    let obj = dbAccess.transaction('states', 'readwrite').objectStore('states');

    let req = obj.get(qId);
    req.onsuccess = function(e) {
        let data = e.target.result;

        data.state = s;
        obj.put(data);
    }
}

function updateInDB_Option(qId, op) {
    let obj = dbAccess.transaction('states', 'readwrite').objectStore('states');

    let req = obj.get(qId);
    req.onsuccess = function(e) {
        let data = e.target.result;

        data.selectedOption = op;
        obj.put(data);
    }
}

function loadOnRefresh() { // This function uses the advantage of IndexedDB: ability to save our answers and marked questions
    let obj = dbAccess.transaction('states', 'readwrite').objectStore('states');
    let req = obj.openCursor();
    
    req.addEventListener('success', function() {
        let cursor = req.result;

        if(cursor)
        {
            let data = cursor.value;
            let q = data.qId;
            let s = data.state;
            let op = data.selectedOption;

            if(s == 1)
            {
                $(`#q${q}`).addClass('review-label');
            }
            else if(s == 2)
            {
                $(`#q${q}`).addClass('attempted-label');
            }
            else if(s == 3)
            {
                $(`#q${q}`).addClass('review-label'); // still under review
            }
            
            cursor.continue();
        }        
    });
}

function addClearButton() {
    let clear = $(`<div title="Clear Options" class="clear-options noSelect">
        <div class="material-icons">restart_alt</div>
    </div>`);
    $('#container').append(clear);


    $('.clear-options').click(() => {
        clear.remove();

        // UI
        $('.option-icon').text('radio_button_unchecked');
        $('.selected').removeClass('selected');

        // DB
        updateInDB_Option(currActiveQues, '');

        let p = loadFromDB(currActiveQues); 
        p.then(function([st, op]) {
            if(st == 2)
            {
                updateInDB_State(currActiveQues, 0);

                // some left over UI changes

                document.getElementById(`q${currActiveQues}`).classList.remove('attempted-label');
                // active label was already applied, so no need to add it again
            }
            else if(st == 3)
            {
                updateInDB_State(currActiveQues, 1);

                // some left over UI changes

                document.getElementById(`q${currActiveQues}`).classList.remove('attempted-label');
                // review label was already applied, so no need to add it again
            }
        });

    });

    // for handling animations on circle btns
    $('.clear-options').on('mouseenter', function() {
        $(this).removeClass('animation-sizedown');
        setTimeout(() => $(this).addClass('enlarged-circle-btn'), 500);
    });

    $('.clear-options').on('mouseleave', function() {
        setTimeout(() => $(this).removeClass('enlarged-circle-btn'), 500);
        $(this).addClass('animation-sizedown');
    });
}

$('.bookmark-icon').click(function() {
    if(!$(this).hasClass('bookmarked')) 
    {
        $(this).text('bookmark');
        $(this).addClass('bookmarked');
        let p = loadFromDB(currActiveQues); 
        p.then(function([st, op]) {
            if(st == 0)
            {
                // DB
                updateInDB_State(currActiveQues, 1);

                // UI
                document.getElementById(`q${currActiveQues}`).classList.add('review-label');
            }
            else if(st == 2)
            {
                // DB
                updateInDB_State(currActiveQues, 3); // combination of review & attempted; a new state -> 3

                // UI
                document.getElementById(`q${currActiveQues}`).classList.remove('attempted-label'); // remove already applied one
                document.getElementById(`q${currActiveQues}`).classList.add('review-label'); // we will keep it under review
            }
        });
    }
    else // un-reviewed
    {
        $(this).text('bookmark_border');
        $(this).removeClass('bookmarked');
        let p = loadFromDB(currActiveQues); 
        p.then(function([st, op]) {
            if(st == 1)
            {
                // DB
                updateInDB_State(currActiveQues, 0);

                // UI
                document.getElementById(`q${currActiveQues}`).classList.remove('review-label');
                // active label was already applied, so no need to add it again
            }
            else if(st == 3)
            {
                // DB
                updateInDB_State(currActiveQues, 2); // bring it back to state 2 -> attempted; user has reviewed and then attempted

                // UI
                document.getElementById(`q${currActiveQues}`).classList.remove('review-label');
                document.getElementById(`q${currActiveQues}`).classList.add('attempted-label'); 
            }
        });
    }
});

$('.option').click(function() {
    // remove from where already applied
    $('.option-icon').text('radio_button_unchecked');
    $('.selected').removeClass('selected');

    $(this).addClass('selected');
    $($(this).children()[0]).text('radio_button_checked');

    if($('.clear-options').length == 0) addClearButton(); // avoid adding multiple clr btns

    updateInDB_Option(currActiveQues, $(`.selected .option-text`).attr('id'));

    let p = loadFromDB(currActiveQues); 
    p.then(function([st, op]) {
        if(st == 0)
        {
            // DB
            updateInDB_State(currActiveQues, 2);

            // UI
            document.getElementById(`q${currActiveQues}`).classList.add('attempted-label');
        }
        else if(st == 1)
        {
            // DB
            updateInDB_State(currActiveQues, 3); // combination of review & attempted; a new state -> 3

            // UI
            document.getElementById(`q${currActiveQues}`).classList.remove('attempted-label'); // remove already applied one
            document.getElementById(`q${currActiveQues}`).classList.add('review-label'); // we will keep it under review
        }
    });
});

$('.go-back, .go-next').on('mouseenter', function() {
    $(this).removeClass('animation-sizedown');
    setTimeout(() => $(this).addClass('enlarged-circle-btn'), 500);
});

$('.go-back, .go-next').on('mouseleave', function() {
    setTimeout(() => $(this).removeClass('enlarged-circle-btn'), 500);
    $(this).addClass('animation-sizedown');
});

$('.go-next').click(function() {
    let next = currActiveQues + 1;
    loadQuestion(next); 
    currActiveQues++;

    $('.qno-selected').removeClass('qno-selected');
    $(`#q${currActiveQues}`).addClass('qno-selected');
});

$('.go-back').click(function() {
    let prev = currActiveQues - 1;
    loadQuestion(prev); 
    currActiveQues--;

    $('.qno-selected').removeClass('qno-selected');
    $(`#q${currActiveQues}`).addClass('qno-selected');
});

$('.instructions').click(function() {
    let modal = $(`<div class="modal-page">
                    <div class="modal">
                        <div class="modal-bar">
                            Capgemini English Test - 1
                            <div class="material-icons close-modal">close</div>
                        </div>
                        <div class="modal-containers">
                            <div class="modal-container-1">
                                <h1>Specific Instructions</h1>
                                <div class="modal-info">
                                    <div class="modal-keys">
                                        <h2>DURATION</h2>  
                                        <h2>SECTION </h2>
                                        <h2>NUMBER OF QUESTIONS</h2>
                                    </div>
                                    <div class="modal-values">
                                        <h2>40m</h2>  
                                        <div class="section-and-marking">
                                            <div class="section-type">Verbal</div>
                                            <div class="marking-scheme"> <mark id="positive">+1</mark> <mark id="neutral">0</mark> <mark id="negative">-0.33</mark> </div>
                                        </div>
                                        <h2>30</h2>     
                                    </div>
                                </div>
                            </div>
                            <div class="modal-container-2">
                                <h1>25 June</h1> <br> <div class="big-year">2021</div>
                        </div>
                    </div>
            </div>
    </div>`);

    $('.main-container').append(modal);

    $('.close-modal').click(function() {
        $(modal).addClass('enlighten-reverse')
        setTimeout(() => modal.remove(), 300);
    });
});