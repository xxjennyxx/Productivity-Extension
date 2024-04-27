// get the new session name and date, and add it to the table if exist
window.onload = function() {
    chrome.storage.local.get(['sessionName', 'table_records', 'hour', 'minute', 'second'], function(result) {
        var table = document.getElementById('table_records');

        // if there's a saved table, load it
        if (result.table_records) {
            table.innerHTML = result.table_records;
        }

        // get the current date
        var date = new Date();
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        var year = date.getFullYear();

        // format the date as dd.mm.yyyy
        var formattedDate = day + '.' + month + '.' + year;

        // if there's a new session name, add it to the table
        if (result.sessionName) {
            console.log('Value currently is ' + result.sessionName);
            var row = table.insertRow(1); // first row (title): 0, last row: -1
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = result.sessionName;
            cell2.innerHTML = formattedDate;

            // delete the temporary sessionName from storage
            chrome.storage.local.remove('sessionName', function() {
                console.log('sessionName has been removed from storage');
            });
            
            // format the time as hh:mm:ss
            var cell3 = row.insertCell(2);
            var formattedTime = String(result.hour).padStart(2, '0') + ':' + String(result.minute).padStart(2, '0') + ':' + String(result.second).padStart(2, '0');
            cell3.innerHTML = formattedTime;

            // reset timer
            chrome.runtime.sendMessage({command: "reset"}, function(response) {
/*                 console.log(response.status); */
            });

            // save the updated table to the storage
            chrome.storage.local.set({table_records: table.innerHTML}, function() {
                console.log('Table has been saved to storage');
            });
        }

        var table = document.getElementById('table_records');
        var dailyText = document.getElementById('daily-time');
        var goalText = document.getElementById('goal-time');
        var totalText = document.getElementById('total-time');

        // initialize daily time
        var dailyHours = 0;
        var dailyMinutes = 0;
        var dailySeconds = 0;

        // initialize total time
        var totalHours = 0;
        var totalMinutes = 0;
        var totalSeconds = 0;

        // iterate over the rows in the table
        for (var i = 1, row; row = table.rows[i]; i++) {
            // get the date and time from the row
            var dateCell = row.cells[1].innerHTML;
            var timeCell = row.cells[2].innerHTML;

            var timeParts = timeCell.split(':');
            // if the date matches today's date, add the time to the daily time
            if (dateCell === formattedDate) {
                dailyHours += parseInt(timeParts[0]);
                dailyMinutes += parseInt(timeParts[1]);
                dailySeconds += parseInt(timeParts[2]);
            }

            totalHours += parseInt(timeParts[0]);
            totalMinutes += parseInt(timeParts[1]);
            totalSeconds += parseInt(timeParts[2]);
        }

        // convert daily time to hh:mm:ss format
        dailySeconds = dailyHours*3600 + dailyMinutes*60 + dailySeconds
        var hours = Math.floor(dailySeconds / 3600);
        dailySeconds %= 3600;
        var minutes = Math.floor(dailySeconds / 60);

        dailyText.innerHTML = hours + 'h ' + minutes + 'm';

        // convert total time to h format
        goalText.innerHTML = (hours + minutes / 60).toFixed(1) + 'h / 3h'; // .toFixed(1): one decimal place

        // convert total time to hh:mm:ss format
        totalSeconds = totalHours*3600 + totalMinutes*60 + totalSeconds
        hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        minutes = Math.floor(totalSeconds / 60); 
        totalText.innerHTML = hours + 'h ' + minutes + 'm';
    });
};

document.getElementById('back-icon').addEventListener('click', function() {
    window.location.href = './main.html';
});
 
// scrollbar styling is not standardized and might not work in all browsers 
var isIEorEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);

if (isIEorEdge) {
    // apply IE/Edge specific styles
    var style = document.createElement('style');
    style.innerHTML = `
        #table_wrapper {
            -ms-overflow-style: auto;
        }
    `;
    document.head.appendChild(style);
} else {
    // apply styles for other browsers
    var style = document.createElement('style');
    style.innerHTML = `
        #table_wrapper::-webkit-scrollbar {
            width: 10px;
        }

        #table_wrapper::-webkit-scrollbar-track {
            background: transparent;
        }

        #table_wrapper::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px; 
        }

        #table_wrapper::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    `;
    document.head.appendChild(style);
}