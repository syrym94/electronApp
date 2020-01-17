const createDom = () => {
    const { ipcMain } = require('electron')
    let fileStr = require('../server/serverFileStr.json')
    let paths = Object.keys(fileStr)
    let files = []
    for (let i = 0; i < paths.length; i++) {
        let tempStr = paths[i].substring(paths[i].indexOf('/') + 1)
        tempStr.substring(0,tempStr.indexOf('/'))
        if(!files.includes(tempStr.substring(0,tempStr.indexOf('/')))){
            files.push(tempStr.substring(0,tempStr.indexOf('/')))
        }
    }
    // console.log(files,'/////////////')
    ipcMain.on('fileReq', event => {
        event.sender.send('fileRep', files)
    })
}
module.exports = createDom