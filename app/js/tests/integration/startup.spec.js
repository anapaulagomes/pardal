const { init, stop } = require('./helpers/app');

describe('Application Startup', () => {
  let app;

  beforeEach(async () => {
    app = await init(app);
  });

  afterEach(async () => stop(app));

  it('opens in background mode', async () => {
    expect(await app.browserWindow.isVisible()).toBeFalsy();
  });
});
