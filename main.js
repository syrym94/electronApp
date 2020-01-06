const { app, BrowserWindow, ipcMain, dialog, shell, Tray, Menu } = require('electron')
const server = require('./server')
const synchronize = require('./synchronize')
const isOnline = require('./isOnline')
const createDom = require('./createDom')
const fileDownload = require('./fileDownload')
const context = require('./context')
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
            preload: `${__dirname}/preload.js`,
            devTools: true
        },
        icon: __dirname + '/assets/zoomia.png'
    })
    win.openDevTools()
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
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
    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)
})