const deleteFile = (file) => {
    const { shell } = require('electron')
    let serverFileStr = require('./serverFileStr.json')
    for (let serverFile in serverFileStr) {
        if (serverFile.substring(serverFile.lastIndexOf('/') + 1) === file) {
            shell.moveItemToTrash(`.${serverFile}`)
        }
    }

}
module.exports = deleteFile