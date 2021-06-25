const ps = new PerfectScrollbar('#container', {
    wheelSpeed: 0.5
});

HoldOn.open({
    theme:"sk-circle",
    message: "Generating Test Report..."
});

setTimeout(() => {
    HoldOn.close();
    displayReport();
    displayProgressBar(1, 0.6);
    displayProgressBar(2, 0.3);
    displayProgressBar(3, 0.7);
}, 2500);

function displayProgressBar(id, val) {
    $(`#prog${id}`).circleProgress({
        value: val,
        size: 200,
        fill: {
          gradient: ["red", "orange"]
        }
    });
}

function displayReport() {
    let data = $(`<div id="prog1"></div>
        <div id="prog2"></div>
        <div id="prog3"></div>
        <div class="time-taken">37m</div>
        <div class="marks">5/30</div>
        <div class="accuracy">58.00%</div>
        <div class="time-label">Time Taken</div>
        <div class="marks-label">Marks</div>
    <div class="accuracy-label">Accuracy</div>`);

    $('.report-container').append(data);
}
