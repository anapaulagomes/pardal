const { Application } = require('spectron');
const electronPath = require('electron');

const init = async () => {
  const app = new Application({
    path: electronPath,
    args: ['.']
  })
  await app.start();
  return app;
}

const stop = async (app) => {
  if (app && await app.isRunning()) {
    return await app.stop();
  }
}

module.exports = {
  init,
  stop,
}