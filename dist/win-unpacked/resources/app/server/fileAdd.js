const fileAdd = (filePath, win) => {
    console.log('inside of fileAdd', filePath)
    const fse = require('fs-extra')
    const path = require('path')
    const fileStructure = require('./fileStructure')
    let fileName = filePath.substring(filePath.lastIndexOf('\\'))
    let history = win.webContents.history
    let structureArr = fileStructure()
    if (history[history.length - 1] !== `file:///${__dirname.substring(0, __dirname.lastIndexOf('\\'))}client\\index.html`) {
        let folder = history[history.length - 1].substring(history[history.length - 1].lastIndexOf('/') + 1, history[history.length - 1].indexOf('.'))
        let thatFolder = path.normalize(structureArr.find(el => {
            return el.includes(folder)
        }))
        console.log(folder, '4444444', thatFolder)
        fse.move(filePath, __dirname.substring(0, __dirname.lastIndexOf('resources') - 1) + `${thatFolder}\\` + fileName, (err) => {
            if (err) console.log(err);
            console.log(`${filePath} was moved to ${__dirname.substring(0, __dirname.lastIndexOf('\\'))}`);
        });

    }
}
module.exports = fileAdd