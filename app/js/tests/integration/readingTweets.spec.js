const { init, stop } = require('./helpers/app');

describe('Reading tweets', () => {
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

  it('should start the app with speaking status false', async () => {
    const status = await app.electron.remote.getGlobal('status')

    expect(status.speaking).toEqual(false);
  });

  it('should start speaking when read-tweets-down is emitted', async () => {
    await app.browserWindow.send('read-tweets-down');

    const status = await app.electron.remote.getGlobal('status')

    expect(status.speaking).toEqual(
      'oauth_dancer : just another test : Tue Aug 28 21:16:23 +0000 2012 , OAuth Dancer Reborn'
    );
  });

  it('should start speaking End of Timeline when read-tweets-up is emitted at first', async () => {
    await app.browserWindow.send('read-tweets-up');

    const status = await app.electron.remote.getGlobal('status')

    expect(status.speaking).toEqual('End of the timeline.');
  });
});