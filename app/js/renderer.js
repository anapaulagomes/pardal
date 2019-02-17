const { ipcRenderer } = require('electron');
const { speak } = require('./speaking');
const { addTemplate, getTemplates } = require('./templates.js');
const { readTweets } = require('./tweets.js');

const saveTemplateButton = document.querySelector('#save-template');

function addTweetTemplate() {
  const template = document.querySelector('#template').value;
  addTemplate('tweet', template);
}

function showTemplateForm() {
  speak("Please type your tweet template.");
  const form = document.querySelector('#template-form');
  const template = document.querySelector('#template');
  form.hidden = false;
  template.textContent = getTemplates()['tweet'];
  template.focus();
}

ipcRenderer.on('settings-create-template', () => {
  showTemplateForm();
});

saveTemplateButton.addEventListener('click' , function(){
  addTweetTemplate();
});

ipcRenderer.on('read-tweets-down', () => {
  readTweets('down');
});

ipcRenderer.on('read-tweets-up', () => {
  readTweets('up');
});


