const { ipcRenderer } = require('electron');
const { speak } = require('./speaking');
const saveTemplateButton = document.querySelector('#save-template');

const defaultTemplate = {
    tweet: "$screen_name : $message : $when , $from"
}

const templateKeysMapping = {
    tweet: {
        screen_name: ['user', 'screen_name'],  // nested keys
        message: ['full_text'],
        when: ['created_at'],
        from: ['source'],
    }
}

const getTemplates = () => {
    return JSON.parse(window.localStorage.getItem('templates')) || defaultTemplate
}

const addTemplate = (templateKey, template) => {
    let templates = getTemplates();
    templates[templateKey] = template;

    window.localStorage.setItem('templates', JSON.stringify(templates));
    return templates;
}

const format = (templateKey, content) => {
    let formattedContent = getTemplates()[templateKey];

    for (var variable in templateKeysMapping[templateKey]) {
        const keyFromTwitter = templateKeysMapping[templateKey][variable]
        const valueFromVariable = getNestedObject(content, keyFromTwitter);
        formattedContent = formattedContent.replace(`$${variable}`, valueFromVariable);
    }
    return formattedContent;
}

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

function addTweetTemplate() {
    const template = document.querySelector('#template').value;
    addTemplate('tweet', template);
}

function showTemplateForm() {
    speak("Please type your tweet template.");
    let form = document.querySelector('#template-form');
    let template = document.querySelector('#template');
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

module.exports = {
    format,
}