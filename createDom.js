const createDom = () => {
    const { ipcMain } = require('electron')
    let fileStr = require('./serverFileStr.json')
    let paths = Object.keys(fileStr)
    let files = []
    for (let i = 0; i < paths.length; i++) {
        files.push(paths[i].substring(paths[i].lastIndexOf('/') + 1))
    }
    // let html = makeul(hierarchy, 'base-UL')
    ipcMain.on('fileReq', event => {
        event.sender.send('fileRep', files)
    })
}
module.exports = createDom