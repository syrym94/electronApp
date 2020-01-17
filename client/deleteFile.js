var path = require('path')
const deleteFile = (file) => {
    console.log('deleting', file)
    const { shell } = require('electron')
    let serverFileStr = require('../server/serverFileStr.json')
    for (let serverFile in serverFileStr) {
        if (serverFile.substring(serverFile.lastIndexOf('/') + 1) === file) {
            let winPath =  path.normalize(serverFile)
            console.log(__dirname.substring(0,__dirname.lastIndexOf('\\')) + winPath)
            shell.moveItemToTrash(`${__dirname.substring(0,__dirname.lastIndexOf('\\')) + winPath}`)
            // console.log(serverFileStr[serverFile],'44444444444444444')
            delete serverFileStr[serverFile]
        }
    }

}
module.exports = deleteFile