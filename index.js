const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow = null;
let on = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
    });

    // timeline
    globalShortcut.register('CmdOrCtrl+Shift+Down', () => {
        on = 'timeline';
        mainWindow.send('read-tweets-down');
    });
    
    globalShortcut.register('CmdOrCtrl+Shift+Up', () => {
        on = 'timeline';
        mainWindow.send('read-tweets-up');
    });

    // settings
    globalShortcut.register('CmdOrCtrl+Alt+S', () => {
        on = 'settings';
        console.log('settings');
    });

    globalShortcut.register('CmdOrCtrl+Alt+T', () => {
        if (on == 'settings') {
            mainWindow.send('settings-create-template');
        } else {
            console.log('invalid command');
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.setAccessibilitySupportEnabled(true);