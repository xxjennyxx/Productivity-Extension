// start the timer
chrome.runtime.sendMessage({command: "start"});

document.getElementById('finish').addEventListener('click', function () { 
    chrome.runtime.sendMessage({command: "stop"});
}); 
  
document.getElementById('break').addEventListener('click', function () { 
    chrome.runtime.sendMessage({command: "stop"});
}); 

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['hour', 'minute', 'second'], function(data) {
        updateTimerUI(data.hour, data.minute, data.second);
    });
});

// update the timer values
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command == "start") {
        timer = true;
        startTimer();
    } else if (request.command == "stop") {
        timer = false;
    } 
});

function updateTimerUI(hour, minute, second) {
    // default to 0 if undefined
    hour = hour || 0;  
    minute = minute || 0;
    second = second || 0;

    // determine the color of the timer values (it is gray at the start)
    let initialColor = "rgb(0, 0, 0)";
    let changeColor = "rgba(159, 158, 158, 0.676)";
    let hourColor = hour > 0 ? initialColor : changeColor;
    let minuteColor = minute > 0 || hour > 0 ? initialColor : changeColor;  // the color of the minutes will remain gray only if the hours is 0
    let secondColor = second > 0 || minute > 0 || hour > 0 ? initialColor : changeColor;
    let colonColor1 = hour > 0 ? initialColor : changeColor;
    let colonColor2 = minute > 0 ? initialColor : changeColor;

    // convert the timer values to strings and pad with zeros
    document.getElementById('hr').innerHTML = hour.toString().padStart(2, '0'); 
    document.getElementById('min').innerHTML = minute.toString().padStart(2, '0'); 
    document.getElementById('sec').innerHTML = second.toString().padStart(2, '0'); 
    document.getElementById('colon1').innerHTML = " : ";
    document.getElementById('colon2').innerHTML = " : ";

    document.getElementById('hr').style.color = hourColor;
    document.getElementById('colon1').style.color = colonColor1;
    document.getElementById('min').style.color = minuteColor;
    document.getElementById('colon2').style.color = colonColor2;
    document.getElementById('sec').style.color = secondColor;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
/*     console.log("Storage changes detected:", changes); // log to see what changes are detected */
    if (namespace === 'local') {
        let changedItems = ['hour', 'minute', 'second'].reduce((acc, key) => {
            if (changes[key]) {
/*                 console.log(`Detected change in ${key}:`, changes[key].oldValue, "->", changes[key].newValue); */
                acc[key] = changes[key].newValue; // capture new value if they exist
            }
            return acc;
        }, {});

        // still retrieve the current values of hour, minute, and second from the storage if they're not included in the changedItems object
        if (Object.keys(changedItems).length) {
/*             console.log("Updating UI with:", changedItems); */
            chrome.storage.local.get(['hour', 'minute', 'second'], function(result) {
                updateTimerUI(
                    changedItems.hour !== undefined ? changedItems.hour : result.hour,
                    changedItems.minute !== undefined ? changedItems.minute : result.minute,
                    changedItems.second !== undefined ? changedItems.second : result.second
                );
            });
        }
    }
});

var i = 0;
var txt = '';
var speed = 50; /* the speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("quote-element").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function fetchQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(quoteData => {
            const quoteText = quoteData.content; 
            const quoteElement = document.getElementById('quote-element');
            // {"_id":"XH8yFMgx_o","author":"George S. Patton","content":"A good plan violently executed now is better than a perfect plan executed next week.","tags":["Motivational"],"authorSlug":"george-s-patton","length":84,"dateAdded":"2022-07-06","dateModified":"2023-04-14"}
            
            // check for overflow
            if (doesQuoteOverflow(quoteElement)) {
                return fetchQuote(); // Fetch another quote 
            } else {
                txt = quoteText; 
                typeWriter();
            }
        })
        .catch(error => {
            console.error("Error fetching quote: ", error);
        });
}

// random quote fetching, typing effect
window.onload = function() {
    fetchQuote();
    // sound effect
    var audio = document.getElementById('music');
    audio.volume = 0.4; // 50% volume, between 0.0 and 1.0
    audio.loop = true; // loop the audio
    audio.play();

    // animation
    animateImage();
}

function doesQuoteOverflow(quoteElement) {
    return quoteElement.scrollHeight > quoteElement.clientHeight;
}

// if the music-icon is click, stop playing, and change to another icon
document.getElementById('music-icon').addEventListener('click', function() {
    var audio = document.getElementById('music');
    var muteButton = document.getElementById('music-icon');

    if (audio.paused) {
        audio.play();
        muteButton.src = './images/music-on.png'; 
    } else {
        audio.pause();
        audio.currentTime = 0;
        muteButton.src = './images/music-off.png'; 
    }
});

function animateImage() {
    var imgIndex = 0;
    var images = ["./images/blue_cat1.png", "./images/blue_cat2.png", "./images/blue_cat3.png", "./images/blue_cat4.png", "./images/blue_cat5.png", "./images/blue_cat6.png"];
    var delay = 900; // Total cycle time: 150*6

    setInterval(function() {
        document.getElementById("animation").src = images[imgIndex++];
        if (imgIndex >= images.length) imgIndex = 0;
    }, delay / images.length);
}

