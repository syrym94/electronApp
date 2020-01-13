const { app, BrowserWindow, ipcMain, dialog, shell, Tray, Menu } = require('electron')
const server = require('./server/server')
const synchronize = require('./server/synchronize')
const isOnline = require('./server/isOnline')
const createDom = require('./client/createDom')
const fileDownload = require('./client/fileDownload')
const context = require('./client/context')
let win
const url = require('url')
const path = require('path')
async function createWindow() {
    server()
    let stats = await synchronize()
    isOnline(stats)
    createDom()
    win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            preload: `${__dirname}/client/preload.js`,
            devTools: true
        },
        icon: __dirname + '/assets/zoomia.png'
    })
    win.openDevTools()
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/client/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}
ipcMain.on('reqFile', (event, arg) => {
    fileDownload(arg)
})
ipcMain.on('context', (event, obj) => {
    context(obj)
})
let tray = null
app.on('ready', () => {
    createWindow()
    tray = new Tray(__dirname + '/assets/zoomiaIcon.png')
    const contextMenu = Menu.buildFromTemplate([{
            label: 'Show',
            click: function() {
                win.show();
            }
        },
        {
            label: 'Close',
            click: function() {
                app.isQuiting = true;
                app.quit();
            }
        }
    ])
    tray.setToolTip('This is Zoomia application.')
    tray.setContextMenu(contextMenu)
})