const { app, BrowserWindow, globalShortcut, Menu, Tray } = require('electron');

let mainWindow = null;
global.status = { speaking: false };

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        show: false,
    });
    let on = 'idle';

    mainWindow.on('close', event => {
        if (mainWindow.forceClose) return;
        event.preventDefault();
        mainWindow.hide();
    });

    const tray = new Tray(__dirname + '/app/img/temp.png');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show Pardal',
            click() {
                mainWindow.show();
            }
        },
        {
            label: 'Quit',
            role: 'quit'
        },
    ])
    tray.setContextMenu(contextMenu);

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
        mainWindow.show();
    });

    globalShortcut.register('CmdOrCtrl+Alt+T', () => {
        if (on === 'settings') {
            console.log('creating a template');
            mainWindow.send('settings-create-template');
        } else {
            console.log('invalid command');
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('before-quit', () => {
    mainWindow.forceClose = true;
});

app.on('activate-with-no-open-windows', () => {
    mainWindow.show();
});
