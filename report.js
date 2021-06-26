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

const ps = new PerfectScrollbar('#container', {
    wheelSpeed: 0.5
});

let dbAccess;
let request = indexedDB.open('Question States', 1);

request.addEventListener('success', function() {
    dbAccess = request.result;

    HoldOn.open({
        theme:"sk-circle",
        message: "Generating Test Report..."
    });
    
    // Do this after loading DB
    let p = getResult();
    p.then(function([marks, accuracy, timeTaken]){
        setTimeout(() => {        
        HoldOn.close();
            displayReport(marks, accuracy, timeTaken);
            displayProgressBar(1, timeTaken/40);
            displayProgressBar(2, marks/30);
            displayProgressBar(3, accuracy/100);
        }, 2500);
    });
});


function displayProgressBar(id, val) {
    $(`#prog${id}`).circleProgress({
        value: val,
        size: 200,
        fill: {
          gradient: ["red", "orange"]
        }
    });
}

function displayReport(marks, accuracy, timeTaken) {
    let data = $(`<div id="prog1">
            <div class="time-taken">${timeTaken}m</div>
        </div>
        <div id="prog2">
            <div class="marks">${marks}/30</div>
        </div>
        <div id="prog3">
            <div class="accuracy">${accuracy}%</div>
        </div>
        
        <div class="time-label">Time Taken</div>
        <div class="marks-label">Marks</div>
    <div class="accuracy-label">Accuracy</div>`);

    $('.report-container').append(data);
}

function getResult() {
    return new Promise((resolve) => {
        let marks = 0;
        let correct = 0;
        let attempted = 0;

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

                if(DB[q-1].answer == op)
                {
                    marks = marks + 1;
                    correct++;
                    attempted++;
                } 
                else if(op != '' && DB[q-1].answer != op) 
                {
                    marks = marks - 0.33;
                    attempted++;
                }

                cursor.continue();
            }
            else 
            {
                let accuracy = (correct / attempted) * 100;
                let url = location.href;
                resolve([marks, accuracy, Number(url[url.length-1])]);
            }
        });
    });
}