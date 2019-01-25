/*
It's possible to configure things like language, volume, rate etc
Maybe we should identify the tweet language and change it?
Reference:
https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
*/

function speak(value) {
    var msg = new SpeechSynthesisUtterance(value);
    window.speechSynthesis.speak(msg);
}

module.exports = {
    speak,
}