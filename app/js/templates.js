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

const findValue = (keysFromTwitter, content) => {
  if (keysFromTwitter.length === 1) {
    return content[keysFromTwitter[0]];
  }
  const currentKey = keysFromTwitter.shift();

  return findValue(keysFromTwitter, content[currentKey]);
};

const format = (templateKey, rawContent) => {
  const templateKeys = templateKeysMapping[templateKey];
  let template = getTemplates()[templateKey];

  Object.keys(templateKeys).forEach((keyFromPardal) => {
    const keyFromTwitter = Object.create(templateKeys[keyFromPardal]);
    const valueFromTwitter = findValue(keyFromTwitter, rawContent);
    template = template.replace(`$${keyFromPardal}`, valueFromTwitter);
  });

  return template;
};

module.exports = {
  format,
  addTemplate,
  getTemplates,
};
