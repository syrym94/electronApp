const fileCreate = (win, folder) => {
    const fs = require('fs')
    const path = require('path')
    console.log('folder: ', folder)
    const fileStr = require('../server/fileStructure')
    let serverFiles = fileStr()
    var search = `let files`;
    let exactFolder = serverFiles.find(e=>{
        return e.includes(folder)
    })
    console.log(exactFolder,'111111111')
    fs.readdir(`${__dirname.substring(0,__dirname.lastIndexOf('resources'))}\\${exactFolder}`,(err,items)=>{
        if(err) console.log(err)
        console.log(items,'***********')
        append(items)
    })
    function append(files) {
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
}
module.exports = fileCreate