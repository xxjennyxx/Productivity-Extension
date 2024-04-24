document.getElementById('save').addEventListener('click', function(event) {
    var sessionName = document.getElementById('name').value;
    if (sessionName === '') {
        // if the input field is empty, show an error message and prevent the form from being submitted
        alert('Please enter a session name');
        event.preventDefault();
    } else {
        chrome.storage.local.set({sessionName: sessionName}, function() {
            console.log('Value is set to ' + sessionName);
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
 
// remember to keep the record of timer, not reset
/* 
window.onload = function() {
    document.getElementById('save').onclick = function() {
        var value = document.getElementById('name').value; // Get the session name
        var table = document.getElementById('sessionsTable'); // Get the sessions table

        // Create a new row
        var row = table.insertRow(-1);

        // Create a new cell
        var cell = row.insertCell(0);

        // Set the cell's text to the session name
        cell.textContent = value;

        // Save the session name to chrome storage
        chrome.storage.sync.set({'sessionName': value }, function() {
            alert("Session saved!");
        });
    }

    document.getElementById('get').onclick = function() {
        chrome.storage.sync.get('sessionName', function(data) {
            alert(data.sessionName);
        });
    }
    window.location.href = './records.html'; 
} */