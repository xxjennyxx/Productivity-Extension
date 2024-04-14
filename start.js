let stopBtn = document.getElementById('finish'); 
let breakBtn = document.getElementById('break'); 
  
let hour = 0; 
let minute = 0; 
let second = -1; 
  
timer = true
stopWatch();
  
stopBtn.addEventListener('click', function () { 
    timer = false; 
}); 
  
breakBtn.addEventListener('click', function () { 
    timer = false;  
}); 
  
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
  
        let hrString = hour; 
        let minString = minute; 
        let secString = second; 
  
        if (hour < 10)
            hrString = "0" + hrString; 
  
        if (minute < 10) 
            minString = "0" + minString; 
  
        if (second < 10) 
            secString = "0" + secString; 

        if (hour != 0){
            document.getElementById('hr').style.color = 'black';
            document.getElementById('txt1').style.color = 'black';
        } else {
            if (minute != 0){
                document.getElementById('min').style.color = 'black';
                document.getElementById('txt2').style.color = 'black';
            }
            else {
                if (second != 0){
                    document.getElementById('sec').style.color = 'black';
                }
            }
        }
  
        document.getElementById('hr').innerHTML = hrString; 
        document.getElementById('min').innerHTML = minString; 
        document.getElementById('sec').innerHTML = secString; 

        setTimeout(stopWatch, 1000);  // 10: ms, 1000:s, ...
    } 
}


var i = 0;
var txt = '';
var speed = 50; /* The speed/duration of the effect in milliseconds */

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

