const isOnline = async(stats) => {

    const fs = require("fs");
    let serverFileStr = require('./serverFileStr.json')
    const https = require('https');
    const notifier = require('node-notifier')
    const EventEmitter = require('events');

    class MyEmitter extends EventEmitter {}

    const myEmitter = new MyEmitter();
    const { ipcMain } = require('electron')
    ipcMain.on('fileStrReq', (event, args) => {
        event.sender.send('fileStr', serverFileStr)
    })
    setInterval(() => {
        require('dns').resolve('www.google.com', function(err) {
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
                return
                // let strArr = Object.keys(serverFileStr)
                // for (let dir = 0; dir < strArr.length; dir++) {
                //     console.log(strArr[dir], Object.keys(serverFileStr))
                //         // try {
                //         //     fs.mkdir(`.${strArr[dir]}`, { recursive: true }, err => {
                //         //         if (err) console.log(err)
                //         //     })
                //         // } catch (e) {
                //         //     console.log(e)
                //         // }
                //     try {
                //         console.log(strArr[dir])
                //         if (fs.existsSync(`.${strArr[dir]}`) === false) {
                //             let folder = strArr[dir].substring(strArr[dir].indexOf('/'), strArr[dir].lastIndexOf('/'))
                //             fs.mkdir(`.${folder}`, { recursive: true }, err => {
                //                 if (err) console.log(err)
                //                     // fs.writeFile(`.${dir}`, null, err => {
                //                     //         if (err) console.log(err)
                //                     //     })
                //                 fs.closeSync(fs.openSync(`.${strArr[dir]}`, 'w'))
                //             })
                //         } else {
                //             // fs.writeFile(`.${dir}`, null, err => {
                //             //     if (err) console.log(err)
                //             // })
                //             console.log('already exists', strArr[dir])
                //         }
                //     } catch (e) {
                //         console.log(e)
                //     }
                //     return
                //     const exec = require('child_process').exec
                //     let folder = strArr[dir].substring(strArr[dir].indexOf('/'), strArr[dir].lastIndexOf('/'))

                //     function processDetect() {
                //         console.log('monitoring whether any file in directory is opened')
                //         exec(`ps -aef | grep -v "grep" | grep -i "/home/syrym/Documents/electronTUT${folder}" | awk '{print $2,$9}'`, async(err, stdout, stderr) => {
                //             if (stdout !== '') {
                //                 let pid = stdout.substring(stdout.lastIndexOf('/home'), 0).trim()
                //                 let openedFile = stdout.substring(stdout.lastIndexOf('/home'))
                //                     // console.log(openedFile)
                //                 if (`/home/syrym/Documents/electronTUT${strArr[dir]}` === openedFile.trim()) {
                //                     fs.stat(`${openedFile.trim()}`, (err, stats) => {
                //                         if (err) console.log(err)
                //                             // console.log(stats)
                //                         if (stats.size <= 4) {
                //                             myEmitter.emit('event', pid, serverFileStr[strArr[dir]].serverUri, openedFile);
                //                             notifier.notify({
                //                                     title: 'File is empty',
                //                                     message: 'Please wait file to be downloaded'
                //                                 })
                //                                 // clearInterval(interval)
                //                         }
                //                     })
                //                 }
                //             } else {
                //                 console.log('no files are opened')
                //             }
                //             // console.log(stdout)
                //         })
                //     }
                //     let interval = setInterval(processDetect, 500)
                //     myEmitter.on('event', (pid, serverUri, openedFile) => {
                //         // console.log(`${dir} was opened`)
                //         clearInterval(interval)
                //         const file = fs.createWriteStream(`${openedFile.trim()}`);
                //         // console.log(`/home/syrym/Documents/electronTUT${dir}` === openedFile.trim())
                //         exec(`kill ${pid}`)
                //         const request = https.get(serverUri, function(response) {
                //             response.pipe(file);
                //             file.on('finish', function() {
                //                 file.close();
                //                 console.log('File writing is over')
                //                 notifier.notify({
                //                     title: 'Downloading is over',
                //                     message: 'File is ready to be opened'
                //                 })
                //                 interval = setInterval(processDetect, 500)
                //             });
                //         }).on("error", err => {
                //             console.log(err)
                //             fs.unlink(`${openedFile.trim()}`, err => {
                //                 console.log(err)
                //             })
                //         })
                //     });
                // }
            }
        });
        ipcMain.removeAllListeners('isOnline')
    }, 1000)
}
module.exports = isOnline
    // const file = fs.createWriteStream(`/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4`);
    //             const request = https.get(serverFileStr["/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4"].serverUri, function (response) {
    //                 response.pipe(file);
    //                 file.on('finish', function () {
    //                     file.close();  // close() is async, call cb after close completes.
    //                     console.log(response, 'File writing is over')

//                 });
//             }).on("error", err => {
//                 console.log(err)
//                 fs.unlink("/home/syrym/Documents/electronTUT/syrym/Documents/testFolder/big_buck_bunny_720p_10mb.mp4")
//             })s