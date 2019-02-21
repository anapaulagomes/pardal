const { init, stop } = require('./helpers/app');

describe('settings', () => {
  let app;
  let previousTemplates;

  beforeEach(async () => {
    app = await init();
    previousTemplates = await app.client.localStorage('GET', 'templates');
    await app.client.localStorage('DELETE', 'templates');
  });

  afterEach(async () => {
    if (previousTemplates.value) {
      await app.client.localStorage('POST', {
        key: 'templates',
        value: previousTemplates.value,
      });
    }
    await stop(app);
  });

  it('should be able to see the current tweet template and add a new one', async () => {
    const defaultTweetTemplate = '$screen_name : $message : $when , $from';
    const newTweetTemplate = '$screen_name : $message';

    await app.browserWindow.show();
    expect(await app.browserWindow.isVisible()).toBeTruthy();

    await app.browserWindow.send('settings-create-template');
    expect(await app.client.$('#template').getValue()).toEqual(defaultTweetTemplate);

    await app.client.$('#template').setValue(newTweetTemplate);
    await app.client.$('#save-template').click();

    await app.browserWindow.send('settings-create-template');
    expect(await app.client.$('#template').getValue()).toEqual(newTweetTemplate);
  });
});
