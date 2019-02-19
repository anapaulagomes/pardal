/*
It's possible to configure things like language, volume, rate etc
Maybe we should identify the tweet language and change it?
Reference:
https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
*/

const { remote } = require('electron');

function speak(value) {
    const utterance = new SpeechSynthesisUtterance(value)
    utterances = [ utterance ];
    window.speechSynthesis.speak(utterances[0]);

    utterance.addEventListener('start', event => {
      remote.getGlobal('status').speaking = event.utterance.text;
    });

    utterance.addEventListener('end', () => {
      remote.getGlobal('status').speaking = false;
    });
}

module.exports = {
    speak,
}
