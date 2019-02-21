const { getTemplates, addTemplate, format } = require('../../templates');

describe('getTemplates', () => {
  it('should return the template stored in localStorage if there is one', () => {
    window.localStorage.setItem('templates', '{ "tweet": "stored-template" }');

    const templates = getTemplates();

    expect(templates).toEqual({ tweet: 'stored-template' });
    window.localStorage.removeItem('templates');
  });

  it('should return the default template if there is none stored', () => {
    const templates = getTemplates();

    expect(templates).toEqual({ tweet: '$screen_name : $message : $when , $from' });
  });
});

describe('addTemplate', () => {
  afterEach(() => {
    window.localStorage.removeItem('templates');
  });

  it('should add template for type in localStorage', () => {
    addTemplate('anyOtherType', 'template-for-it');

    const templates = JSON.parse(window.localStorage.getItem('templates'));
    expect(templates.anyOtherType).toEqual('template-for-it');
  });

  it('should update template for type in localStorage if there already is one', () => {
    window.localStorage.setItem('templates', '{ "anyOtherType": "template-for-it" }');
    addTemplate('anyOtherType', 'updated-template-for-it');

    const templates = JSON.parse(window.localStorage.getItem('templates'));
    expect(templates.anyOtherType).toEqual('updated-template-for-it');
  });
});

describe('format', () => {
  afterEach(() => {
    window.localStorage.removeItem('templates');
  });

  describe('when tweet', () => {
    it('should map $when to field created_at', () => {
      window.localStorage.setItem('templates', '{ "tweet": "$when" }');

      const content = {
        created_at: 'Tue Aug 28 21:16:23 +0000 2012',
        full_text: 'just another test',
        source: 'OAuth Dancer Reborn',
        user: { screen_name: 'oauth_dancer' },
      };

      expect(format('tweet', content)).toEqual('Tue Aug 28 21:16:23 +0000 2012');
    });

    it('should map $message to field full_text', () => {
      window.localStorage.setItem('templates', '{ "tweet": "$message" }');

      const content = {
        created_at: 'Tue Aug 28 21:16:23 +0000 2012',
        full_text: 'just another test',
        source: 'OAuth Dancer Reborn',
        user: { screen_name: 'oauth_dancer' },
      };

      expect(format('tweet', content)).toEqual('just another test');
    });

    it('should map $from to field source', () => {
      window.localStorage.setItem('templates', '{ "tweet": "$from" }');

      const content = {
        created_at: 'Tue Aug 28 21:16:23 +0000 2012',
        full_text: 'just another test',
        source: 'OAuth Dancer Reborn',
        user: { screen_name: 'oauth_dancer' },
      };

      expect(format('tweet', content)).toEqual('OAuth Dancer Reborn');
    });

    it("should map $screen_name to users's nested field screen_name", () => {
      window.localStorage.setItem('templates', '{ "tweet": "$screen_name" }');

      const content = {
        created_at: 'Tue Aug 28 21:16:23 +0000 2012',
        full_text: 'just another test',
        source: 'OAuth Dancer Reborn',
        user: { screen_name: 'oauth_dancer' },
      };

      expect(format('tweet', content)).toEqual('oauth_dancer');
    });

    it('should be able to format templates composed by multiple fields', () => {
      window.localStorage.setItem(
        'templates',
        '{ "tweet": "$screen_name : $message : $when , $from" }',
      );

      const content = {
        created_at: 'Tue Aug 28 21:16:23 +0000 2012',
        full_text: 'just another test',
        source: 'OAuth Dancer Reborn',
        user: { screen_name: 'oauth_dancer' },
      };

      expect(format('tweet', content)).toEqual(
        'oauth_dancer : just another test : Tue Aug 28 21:16:23 +0000 2012 , OAuth Dancer Reborn',
      );
    });
  });
});
