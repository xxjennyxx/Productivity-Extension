document.getElementById('return').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = './finish.html';
});

document.getElementById('del').addEventListener('click', function(event) {
    event.preventDefault();
    // reset timer
    chrome.runtime.sendMessage({command: "reset"}, function(response) {
        /*                 console.log(response.status); */
                        });
    window.location.href = './main.html';
});
