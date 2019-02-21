const { remote } = require('electron');

function speak(value) {
  const utterance = new SpeechSynthesisUtterance(value);
  const utterances = [utterance];
  window.speechSynthesis.speak(utterances[0]);

  utterance.addEventListener('start', (event) => {
    remote.getGlobal('status').speaking = event.utterance.text;
  });

  utterance.addEventListener('end', () => {
    remote.getGlobal('status').speaking = false;
  });
}

module.exports = {
  speak,
};
