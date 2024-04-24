// get the new session name and add it to the table if exist
window.onload = function() {
    chrome.storage.local.get(['sessionName', 'table_records'], function(result) {
        var table = document.getElementById('table_records');

        // if there's a saved table, load it
        if (result.table_records) {
            table.innerHTML = result.table_records;
        }

        // if there's a new session name, add it to the table
        if (result.sessionName) {
            console.log('Value currently is ' + result.sessionName);
            var row = table.insertRow(1); // first row (title): 0, last row: -1
            var cell1 = row.insertCell(0);
            cell1.innerHTML = result.sessionName;

            // delete the temporary sessionName from storage
            chrome.storage.local.remove('sessionName', function() {
                console.log('sessionName has been removed from storage');
            });

            // save the updated table to the storage
            chrome.storage.local.set({table_records: table.innerHTML}, function() {
                console.log('Table has been saved to storage');
            });
        }
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