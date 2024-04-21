chrome.action.onClicked.addListener(tab => {
    chrome.windows.getCurrent(async (currentWindow) => {
        // center the popup window on the user's screen
        let width = 560;
        let height = 330;
        let left = Math.round((currentWindow.width - width) / 2 + currentWindow.left);
        let top = Math.round((currentWindow.height - height) / 2 + currentWindow.top)- 100; // Subtract 50 to move the window up

        let createData = {
            type: 'popup',
            url: 'main.html',
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

let hour = 0; 
let minute = 0; 
let second = -1; 
let timer = false;

function stopWatch() { 
    if (timer) { 
        second++;
  
        if (second == 60) { 
            minute++; 
            second = 0; 
        } 
  
        if (minute == 60) { 
            hour++; 
            minute = 0; 
            second = 0; 
        } 

        // convert the timer values to strings and pad with zeros
        let hourString = String(hour).padStart(2, '0');
        let minuteString = String(minute).padStart(2, '0');
        let secondString = String(second).padStart(2, '0');

        // determine the color of the timer values (it is gray at the start)
        let initialColor = "rgb(0, 0, 0)";
        let changeColor = "rgba(159, 158, 158, 0.676)";
        let hourColor = hour > 0 ? initialColor : changeColor;
        let minuteColor = minute > 0 || hour > 0 ? initialColor : changeColor;  // the color of the minutes will remain gray only if the hours is 0
        let secondColor = second > 0 || minute > 0 || hour > 0 ? initialColor : changeColor;
        let colonColor1 = hour > 0 ? initialColor : changeColor;
        let colonColor2 = minute > 0 ? initialColor : changeColor;

        // check if the tab is fully loaded before sending the message, ensure that the tabs array has at least one element before trying to access the status property of the first element
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs.length > 0 && tabs[0].status === "complete") {
                chrome.runtime.sendMessage({command: "get", hour: hourString, minute: minuteString, second: secondString, hourColor: hourColor, minuteColor: minuteColor, secondColor: secondColor, colonColor1: colonColor1, colonColor2: colonColor2});
            }
        });
    }
}

setInterval(stopWatch, 1000); // 10: ms, 1000:s, ...

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "start") {
            timer = true;
        } else if (request.command == "stop") {
            timer = false;
        } else if (request.command == "get") {
            let hourString = String(hour).padStart(2, '0');
            let minuteString = String(minute).padStart(2, '0');
            let secondString = String(second).padStart(2, '0');
            sendResponse({hour: hourString, minute: minuteString, second: secondString});
        }
    }
);