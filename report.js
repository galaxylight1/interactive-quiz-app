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
    p.then(function([marks, accuracy, timeTaken, correct, skipped, wrong]){
        setTimeout(() => {        
            HoldOn.close();
            displayReport(marks, accuracy, timeTaken, correct, skipped, wrong);
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

function displayReport(marks, accuracy, timeTaken, correct, skipped, wrong) {
    let data = $(`<div class="goodbye-text">Thank you for attending Amazon's Data Structures Quiz</div>
    <div class="stats">
        <div id="prog1">
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
        <div class="accuracy-label">Accuracy</div>
    </div>
    <div class="more-info">
        <div class="values">
            <div>1</div>
            <div>30</div>
            <div>40m</div>
        </div>
        <div class="keys">
            <div>Section</div>
            <div>Questions</div>
            <div>Total Time</div>
        </div>
    </div>
    <div class="line"></div>
    <div class="goodbye-text" id="analysis-below">Analysis</div>
    <div class="analysis-box">
        <div class="box-heading">Technical</div>
        <div class="line"></div>
        <div class="score">${marks}/30</div>
        <div class="your-score">Your Score</div>
        <div class="time-used">${timeTaken} mins</div>
        <div class="your-time-used">Time Taken</div>
        <div class="line"></div>
        <div class="question-stats">
            <div class="correct" style="color: green">${correct}</div>
            <div class="skipped" style="color: rgb(244,223,36)">${skipped}</div>
            <div class="wrong" style="color: red">${wrong}</div>
        </div>
        <div class="question-labels">
            <div class="correct-lbl">Correct</div>
            <div class="skipped-lbl">Skipped</div>
            <div class="wrong-lbl">Wrong</div>
        </div>
    </div>`);

    $('.report-container').prepend(data);
}

function getResult() {
    return new Promise((resolve) => {
        let marks = 0;
        let correct = 0;
        let attempted = 0;
        let wrong = 0;

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
                    wrong++;
                    attempted++;
                }

                cursor.continue();
            }
            else 
            {
                let accuracy = (correct / attempted) * 100;
                let url = location.href;
                resolve([marks, accuracy, Number(url[url.length-1]), correct, 40 - attempted, wrong]);
            }
        });
    });
}