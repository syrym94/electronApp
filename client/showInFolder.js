const showInFolder = (file) => {
    console.log('showing in folder', file)
    const { shell } = require('electron')
    let serverFileStr = require('./serverFileStr.json')
    for (let serverFile in serverFileStr) {
        if (serverFile.substring(serverFile.lastIndexOf('/') + 1) === file) {
            shell.showItemInFolder(`.${serverFile}`)
        }
    }
}
module.exports = showInFolder