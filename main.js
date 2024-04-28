window.onload = function() {
    var img = document.getElementById('followMouse');
    var imgX = 0;
    var imgY = window.innerHeight - img.offsetHeight - 2; // setting top position
    var speed = 0.01;
    var mouseX, mouseY;
    var moving = false;
    var images = ["./images/blue_cat1.png", "./images/blue_cat2.png", "./images/blue_cat3.png", "./images/blue_cat4.png", "./images/blue_cat5.png", "./images/blue_cat6.png"];
    var imageIndex = 0;

    document.onmousemove = function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
        var centerX = imgX + img.offsetWidth / 2;
        if (mouseX < centerX) { // if the mouse is moving to the left
            img.style.transform = 'scaleX(-1)'; // flip the image
        } else if (mouseX > centerX) { // if the mouse is moving to the right
            img.style.transform = 'scaleX(1)'; // unflip the image
        } // if mouseX == centerX, do nothing 
        if (!moving) {
            moving = true;
            img.src = images[imageIndex]; // change the image
            requestAnimationFrame(moveImage);
        }
    };

    var frameCount = 0;
    function moveImage() {
        var centerX = imgX + img.offsetWidth / 2;
        if (Math.abs(mouseX - centerX) > 1) {
            var distance = Math.abs(mouseX - centerX);
            var dynamicSpeed = speed;
            if (distance < 50) { // if the distance is small
                dynamicSpeed *= (1 + (50 - distance) / 50); // increase the speed factor
            }
            imgX += (mouseX - centerX) * dynamicSpeed; // adjust the image position by half of the image width
            if (Math.abs(mouseX - centerX) < 1) { // if the distance is small
                imgX = mouseX - img.offsetWidth / 2; // set the image position directly to the mouse position
            }
        }

        // move up and down
/*         if (Math.abs(mouseY - imgY) > 1) { 
            imgY += (mouseY - imgY) * speed;
        } */

        img.style.left = imgX + 'px';
        img.style.top = imgY + 'px';

        // update the image every few frames
        if (frameCount % 10 === 0) { // change the image every 10 frames
            // check if the mouse is at the centre of the image
            if (Math.abs(mouseX - centerX) <= 1) {
                img.src = './images/blue_cat1.png';
                imageIndex = 0; // reset the image index
            } else {
                img.src = images[imageIndex];
                imageIndex = (imageIndex + 1) % images.length;
            }
        }
        frameCount++;

        if (Math.abs(mouseX - centerX) > 1) { // if (Math.abs(mouseX - imgX) > 1 || Math.abs(mouseY - imgY) > 1) 
            requestAnimationFrame(moveImage);
        } else {
            moving = false;
            frameCount = 0; // reset the frame count when the image stops moving
        }
    }    
}