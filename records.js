document.getElementById('back-icon').addEventListener('click', function() {
    window.location.href = './main.html';
});
 
// scrollbar styling is not standardized and might not work in all browsers 
var isIEorEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);

if (isIEorEdge) {
    // Apply IE/Edge specific styles
    var style = document.createElement('style');
    style.innerHTML = `
        #table_wrapper {
            -ms-overflow-style: auto;
        }
    `;
    document.head.appendChild(style);
} else {
    // Apply styles for other browsers
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