chrome.action.onClicked.addListener(tab => {
    chrome.windows.getCurrent(async (currentWindow) => {
        // center the popup window on the user's screen
        let width = 560;
        let height = 350;
        let left = Math.round((currentWindow.width - width) / 2 + currentWindow.left);
        let top = Math.round((currentWindow.height - height) / 2 + currentWindow.top)- 100; // subtract 50 to move the window up

        if (timer) { // if the timer is still running, open timer page
            var page = 'start.html';
        } else {
            page = 'main.html';
        }

        let createData = {
            type: 'popup',
            url: page,
            width: width,
            height: height,
            left: left,
            top: top
        };

        chrome.windows.create(createData, function(window) {
            /* console.log('New window created:', window); */
        });
    });
});

let totalSeconds = 0; 
let timer = false;
let timerInterval = null;

function startTimer() { 
    if (!timerInterval) {
        timer = true;
        timerInterval = setInterval(tickTimer, 1000);
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timer = false;
}

function tickTimer() {
    if (!timer) return; // exit if the timer isn't active

    totalSeconds++;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds % 3600) / 60);
    let second = totalSeconds % 60;

    // persist updated time every tick
    chrome.storage.local.set({hour, minute, second}, () => {
        /* if (chrome.runtime.lastError) {
            console.log(`Error updating time: ${chrome.runtime.lastError.message}`);
        } else {
            console.log("Time updated", {hour, minute, second});
        } */
    });
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    chrome.storage.local.set({hour: 0, minute: 0, second: 0}, function() {
        /* console.log('Time has been reset to 00:00:00'); */
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.command == "start") {
            timer = true; // start timer
            startTimer();
            sendResponse({status: 'Timer started'});
        } else if (request.command == "stop") {
            timer = false; // stop timer 
            stopTimer();
            sendResponse({status: 'Timer stopped'});
        } else if (request.command == "reset") {
            resetTimer();
            sendResponse({status: 'Timer resetted'});
        }
    }
);