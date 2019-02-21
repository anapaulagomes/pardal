const defaultTemplate = {
  tweet: '$screen_name : $message : $when , $from',
};

const templateKeysMapping = {
  tweet: {
    screen_name: ['user', 'screen_name'], // nested keys
    message: ['full_text'],
    when: ['created_at'],
    from: ['source'],
  },
};

const getTemplates = () => JSON.parse(window.localStorage.getItem('templates')) || defaultTemplate;

const addTemplate = (type, template) => {
  const templates = getTemplates();
  templates[type] = template;

  window.localStorage.setItem('templates', JSON.stringify(templates));
  return templates;
};

const getNestedObject = (nestedObj, pathArr) => pathArr.reduce(
  (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
  nestedObj,
);

const format = (templateKey, content) => {
  let formattedContent = getTemplates()[templateKey];

  Object.keys(templateKeysMapping[templateKey]).forEach((variable) => {
    const keyFromTwitter = templateKeysMapping[templateKey][variable];
    const valueFromVariable = getNestedObject(content, keyFromTwitter);
    formattedContent = formattedContent.replace(`$${variable}`, valueFromVariable);
  });
  return formattedContent;
};

module.exports = {
  format,
  addTemplate,
  getTemplates,
};
