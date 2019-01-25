const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
    });
    
    globalShortcut.register('CmdOrCtrl+Shift+Down', () => {
        mainWindow.send('read-tweets-down');
    });
    
    globalShortcut.register('CmdOrCtrl+Shift+Up', () => {
        mainWindow.send('read-tweets-up');
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.setAccessibilitySupportEnabled(true);