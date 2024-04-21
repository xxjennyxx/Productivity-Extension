/* let finBtn = document.getElementById('fin'); 
let continueBtn = document.getElementById('continue'); 
  
  
finBtn.addEventListener('click', function () { 
    break_timer = false; 
}); 
  
continueBtn.addEventListener('click', function () { 
    break_timer = false;  
});   */

function startTimer(duration) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector('#break_hr').textContent = hours;
        document.querySelector('#break_min').textContent = minutes;
        document.querySelector('#break_sec').textContent = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function() {
    // start the timer
    var time = 19 * 60 + 59; // 20 minutes
    startTimer(time);

    // sound effect
    var tickingSound = document.getElementById('ticking-sound');
    tickingSound.volume = 0.4; // 40% volume, between 0.0 and 1.0
    tickingSound.loop = true; // loop the ticking sound
    tickingSound.play();

    var music = document.getElementById('music');
    music.volume = 0.4; // 40% volume, between 0.0 and 1.0
    music.loop = true; // loop the music
    // don't play the music yet, it will start when the music-icon is clicked

    // animation
    animateImage();
    setInterval(animateImage, 2000); // repeat the animation every 2.0 seconds
}

// if the mute-button is clicked, stop playing the ticking sound, and change to another icon
document.getElementById('mute-button').addEventListener('click', function() {
    var tickingSound = document.getElementById('ticking-sound');
    var music = document.getElementById('music');
    var muteButton = document.getElementById('mute-button');
    var musicIcon = document.getElementById('music-icon');

    if (tickingSound.paused) {
        music.pause();
        music.currentTime = 0;
        tickingSound.play();
        muteButton.src = './images/volume-up.png'; 
        musicIcon.src = './images/music-off.png';
    } else {
        tickingSound.pause();
        tickingSound.currentTime = 0;
        muteButton.src = './images/volume-off.png'; 
    }
});

// if the music-icon is clicked, stop playing the ticking sound, start playing the music, and change both icons
document.getElementById('music-icon').addEventListener('click', function() {
    var tickingSound = document.getElementById('ticking-sound');
    var music = document.getElementById('music');
    var muteButton = document.getElementById('mute-button');
    var musicIcon = document.getElementById('music-icon');

    if (music.paused) {
        tickingSound.pause();
        tickingSound.currentTime = 0;
        music.play();
        muteButton.src = './images/volume-off.png'; 
        musicIcon.src = './images/music-on.png';
    } else {
        music.pause();
        music.currentTime = 0;
        musicIcon.src = './images/music-off.png'; 
    }
});

// repeating typing effect
var i = 0;
var txt = 'Keep it up! You are doing great!';
var speed = 50; // the speed/duration of the effect in milliseconds 

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("inspirational-sentence").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    } else {
        // reset i and delay the clearing of the innerHTML and the repetition of the typing effect
        i = 0;
        setTimeout(function() {
            document.getElementById("inspirational-sentence").innerHTML = '';
            typeWriter();
        }, 2000); // wait for 2 seconds before repeating
    }
}

typeWriter();

function animateImage() {
    var imgIndex = 0;
    var images = ["./images/blue_cat_idle1.png", "./images/blue_cat_idle2.png", "./images/blue_cat_idle3.png", "./images/blue_cat_idle4.png"];
    var delay = 2000; // total cycle time: 500*4

    setInterval(function() {
        document.getElementById("animation").src = images[imgIndex++];
        if (imgIndex >= images.length) imgIndex = 0;
    }, delay / images.length);
}

