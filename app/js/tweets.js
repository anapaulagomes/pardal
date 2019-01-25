const { ipcRenderer } = require('electron');
const { speak } = require('./speaking');

let currentTweet = 0;

function readTweets(direction) {
    const content = document.getElementById("content");

    if (content.children != undefined) {
        if (currentTweet === content.childElementCount) {
            speak("End of the timeline.");
            if (direction === 'up') {
                currentTweet -= 1;
            }
        } else if (currentTweet < 0) {
            speak("End of the timeline.");
            if (direction === 'down') {
                currentTweet += 1;
            }
        } else {
            speak(content.children[currentTweet].textContent);
            if (direction === 'down') {
                currentTweet += 1;
            } else if (direction === 'up') {
                currentTweet -= 1;
            }
        }
    }
}

ipcRenderer.on('read-tweets-down', () => {
    readTweets('down');
});

ipcRenderer.on('read-tweets-up', () => {
    readTweets('up');
});