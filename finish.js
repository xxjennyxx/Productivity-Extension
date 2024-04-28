document.getElementById('save').addEventListener('click', function(event) {
    var sessionName = document.getElementById('name').value;
    if (sessionName === '') {
        // if the input field is empty, show an error message and prevent the form from being submitted
        alert('Please enter a session name');
        event.preventDefault();
    } else {
        chrome.storage.local.set({sessionName: sessionName}, function() {
            /* console.log('Value is set to ' + sessionName); */
        });
    event.preventDefault();
    window.location.href = './records.html'; 
    }
});

document.getElementById('delete').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = './delete.html';
});

document.getElementById('back-icon').addEventListener('click', function() {
    window.location.href = './start.html';
});