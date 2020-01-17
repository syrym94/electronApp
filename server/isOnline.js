const isOnline = async (stats) => {
    var path = require('path')
    const fs = require("fs");
    let serverFileStr = require('./serverFileStr.json')
    const https = require('https');
    const notifier = require('node-notifier')
    const EventEmitter = require('events');

    class MyEmitter extends EventEmitter { }

    const myEmitter = new MyEmitter();
    const { ipcMain } = require('electron')
    ipcMain.on('fileStrReq', (event, args) => {
        event.sender.send('fileStr', serverFileStr)
    })
    setInterval(() => {
        require('dns').resolve('www.google.com', function (err) {
            if (err) {
                // console.log("No connection");
                ipcMain.on('isOnline', (event, args) => {
                    let status = false
                    event.sender.send('onlineStatus', status)
                })
            } else {
                let status = true
                ipcMain.on('isOnline', (event, args) => {
                    event.sender.send('onlineStatus', status)
                })
                // console.log("Connected");
            }
        });
        ipcMain.removeAllListeners('isOnline')
    }, 1000)
    let strArr = Object.keys(serverFileStr)
    for (let dir = 0; dir < strArr.length; dir++) {
        try {
            let winPath = path.normalize(strArr[dir])
            let fileToCheck = __dirname.substring(0, __dirname.lastIndexOf('\\')) + winPath
            if (fs.existsSync(fileToCheck) === false) {
                // console.log(fileToCheck, '111111111111111')
                let folder = fileToCheck.substring(fileToCheck.indexOf('\\'), fileToCheck.lastIndexOf('\\'))
                fs.mkdir(folder, { recursive: true }, err => {
                    if (err) console.log(err)
                    // fs.writeFile(`.${dir}`, null, err => {
                    //         if (err) console.log(err)
                    //     })
                    if (fileToCheck.substring(fileToCheck.lastIndexOf('\\')).includes('.')) {
                        fs.closeSync(fs.openSync(fileToCheck, 'w'))
                    } else {
                        fs.mkdir(fileToCheck, { recursive: true }, err => {
                            if (err) console.log(err)
                        })
                    }
                })
            } else {
                // fs.writeFile(`.${dir}`, null, err => {
                //     if (err) console.log(err)
                // })
                // console.log('already exists', strArr[dir])
            }
        } catch (e) {
            console.log(e)
        }
    }
}
module.exports = isOnline
    // const file = fs.createWriteStream(`/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4`);
    //             const request = https.get(serverFileStr["/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4"].serverUri, function (response) {
    //                 response.pipe(file);
    //                 file.on('finish', function () {
    //                     file.close();  // close() is async, call cb after close completes.
    //                     console.log(response, 'File writing is over')

//             })
//         }).on("error", err => {
//             console.log(err)
//             fs.unlink("/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4")
//         })