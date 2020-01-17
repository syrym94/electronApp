const fileCreate = (win,folder) => {
    const fs = require('fs')
    const path = require('path')
    console.log('folder: ', folder)
    let fileStr = require('../server/serverFileStr.json')
    let paths = Object.keys(fileStr)
    let files = []
    for (let i = 0; i < paths.length; i++) {
        let tempStr = paths[i].substring(paths[i].lastIndexOf(folder) + (folder.length + 1))
        if (tempStr.includes('/')) {
            tempStr.substring(0, tempStr.indexOf('/'))
            if (!files.includes(tempStr.substring(0, tempStr.indexOf('/')))) {
                files.push(tempStr.substring(0, tempStr.indexOf('/')))
            }
        } else {
            if (!files.includes(tempStr)) {
                files.push(tempStr)
            }
        }
    }
    var search = `let files`;
    function append() {
        let filePath = path.join(__dirname, `\\folders\\folder.html`);
        var body = fs.readFileSync(filePath).toString();
        let index = body.indexOf(search) + search.length
        let firstHalf = body.substring(0, index) + ' = ' + JSON.stringify(files) + '\n'
        let secIndex = firstHalf.indexOf(JSON.stringify(files))
        let secondHalf = body.substring(secIndex)
        let newBody = firstHalf + secondHalf
        fs.writeFile(path.join(__dirname, 'folders\\' + folder + '.html'), newBody, err => {
            if (err) console.log(err)
            console.log('done')
            win.webContents.loadFile(path.join(__dirname, 'folders\\' + folder + '.html'))
        })
    }
    append()
}
module.exports = fileCreate