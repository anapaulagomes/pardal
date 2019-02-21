const fakeTimeline = require('./tests/fixtures/timeline.json');

const { speak } = require('./speaking');
const { format } = require('./templates');

const first = -1;
let currentTweet = first;

// FIXME this is gonna be replaced by real content
const timeline = () => fakeTimeline;
const scroll = (direction, last) => {
  if (direction === 'up' && currentTweet !== first) {
    currentTweet -= 1;
  }
  if (direction === 'down' && currentTweet !== last) {
    currentTweet += 1;
  }
};

function readTweets(direction) {
  const content = timeline();

  scroll(direction, content.length);

  if (currentTweet === content.length) {
    speak('End of the timeline.');
  } else if (currentTweet < 0) {
    speak('End of the timeline.');
  } else {
    const formattedTweet = format('tweet', content[currentTweet]);
    speak(formattedTweet);
  }
}

const resetCurrent = () => {
  currentTweet = first;
};

module.exports = {
  readTweets,
  resetCurrent,
};
