var path = require('path');
const showInFolder = (file) => {
    console.log('showing in folder', file)
    const { shell } = require('electron')
    let serverFileStr = require('../server/serverFileStr.json')
    for (let serverFile in serverFileStr) {
        if (serverFile.substring(serverFile.lastIndexOf('/') + 1) === file) {
            let winPath =  path.normalize(serverFile)
            // console.log(__dirname.substring(0,__dirname.lastIndexOf('\\')) + winPath)
            shell.showItemInFolder(`${__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath}`)
        }
    }
}
module.exports = showInFolder