const { remote, ipcRenderer } = require('electron');
const fakeTimeline = require(remote.app.getAppPath() + '/tests/fixtures/timeline.json');

const { speak } = require('./speaking');
const { format } = require('./templates');
let currentTweet = 0;


const timeline = () => {
    // FIXME this is gonna be replaced by real content
    return fakeTimeline;
}

function readTweets(direction) {
    const content = timeline();

    if (currentTweet === content.length) {
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
        const formattedTweet = format('tweet', content[currentTweet]);
        speak(formattedTweet);

        if (direction === 'down') {
            currentTweet += 1;
        } else if (direction === 'up') {
            currentTweet -= 1;
        }
    }
}

ipcRenderer.on('read-tweets-down', () => {
    readTweets('down');
});

ipcRenderer.on('read-tweets-up', () => {
    readTweets('up');
});