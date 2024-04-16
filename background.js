chrome.action.onClicked.addListener(async (tab) => {
    chrome.windows.getCurrent(async (currentWindow) => {
        // center the popup window on the user's screen
        let width = 560;
        let height = 330;
        let left = Math.round((currentWindow.width - width) / 2 + currentWindow.left);
        let top = Math.round((currentWindow.height - height) / 2 + currentWindow.top)- 100; // Subtract 50 to move the window up

        let createData = {
            type: 'popup',
            url: 'main.html',
            width: width,
            height: height,
            left: left,
            top: top
        };

        chrome.windows.create(createData, function(window) {
            /* console.log('New window created:', window); */
        });
    });
});