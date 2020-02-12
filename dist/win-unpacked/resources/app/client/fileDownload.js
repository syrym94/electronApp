const fileDownlaod = (reqFile) => {
    const fs = require("fs")
    const https = require('https')
    const http = require('http')
    const notifier = require('node-notifier')
    let serverFileStr = require('../server/serverFileStr.json')
    let { shell } = require('electron')
    var path = require('path');
    console.log(reqFile)
    return new Promise((resolve, reject) => {
        for (let serverFile in serverFileStr) {
            console.log(serverFile.substring(serverFile.lastIndexOf('/') + 1), reqFile)
            if (serverFile.substring(serverFile.lastIndexOf('/') + 1) === reqFile) {
                let downloader = serverFileStr[serverFile].serverUri.substring(serverFileStr[serverFile].serverUri.indexOf(':'), 0) === 'https' ? https : http
                // console.log(serverFile)
                if (fs.existsSync(`.${serverFile}`) === false) {
                    console.log('file does not exist', serverFile)
                    let folder = serverFile.substring(serverFile.indexOf('/'), serverFile.lastIndexOf('/'))
                    fs.mkdir(`.${folder}`, { recursive: true }, err => {
                        if (err) console.log(err)
                        const file = fs.createWriteStream(`.${serverFile}`)
                        notifier.notify({
                            title: 'File is empty',
                            message: 'Please wait file to be downloaded'
                        })
                        // if (serverFileStr[serverFile].serverUri.substring(serverFileStr[serverFile].serverUri.indexOf(':'), 0) === 'https')
                        const request = downloader.get(serverFileStr[serverFile].serverUri, function (response) {
                            response.pipe(file);
                            file.on('finish', function () {
                                file.close();
                                console.log('File writing is over')
                                notifier.notify({
                                    title: 'Downloading is over',
                                    message: 'File is ready to be opened'
                                })
                                let winPath = path.normalize(serverFile)
                                console.log(__dirname+winPath)
                                // console.log(__dirname.substring(0, __dirname.lastIndexOf('\\')) + winPath)
                                fs.chmod(`${__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath}`, 0o777, (err) => {
                                    if (err) throw err;
                                    console.log(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath,'8888888888')
                                    shell.openItem(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath)
                                  });
                            });
                        }).on("error", err => {
                            console.log(err)
                            fs.unlink(`.${serverFile}`, err => {
                                console.log(err)
                            })
                        })
                    })
                } else {
                    console.log('file already exists', serverFile)
                    fs.stat(`.${serverFile}`, (err, stats) => {
                        if (err) {
                            console.log(err)
                        }
                        // console.log(stats)
                        if (stats.size <= 4) {
                            console.log('file is empty,downloading')
                            notifier.notify({
                                title: 'File is empty',
                                message: 'Please wait file to be downloaded'
                            })
                            const file = fs.createWriteStream(`.${serverFile}`)
                            const request = downloader.get(serverFileStr[serverFile].serverUri, function (response) {
                                response.pipe(file);
                                file.on('finish', function () {
                                    file.close();
                                    console.log('File writing is over')
                                    notifier.notify({
                                        title: 'Downloading is over',
                                        message: 'File is ready to be opened'
                                    })
                                    let winPath = path.normalize(serverFile)
                                    console.log(__dirname+winPath)
                                    // console.log(__dirname.substring(0, __dirname.lastIndexOf('\\')) + winPath)
                                    fs.chmod(`${__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath}`, 0o777, (err) => {
                                        if (err) throw err;
                                        console.log(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath,'8888888888')
                                        shell.openItem(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath)
                                      });
                                });
                            }).on("error", err => {
                                reject('Error with downloading a file, please check the serverUri')
                                console.log(err)
                                fs.unlink(`.${serverFile}`, err => {
                                    console.log(err)
                                })
                            })
                            resolve(1)
                        } else {
                            console.log('file is not empty, ready to open')
                            let winPath = path.normalize(serverFile)
                            fs.chmod(`${__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath}`, 0o777, (err) => {
                                if (err) throw err;
                                console.log(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath,'8888888888')
                                shell.openItem(__dirname.substring(0,__dirname.lastIndexOf('resources')-1) + winPath)
                              });
                            resolve(2)
                        }
                    })
                }
            }
        }
    })
}
module.exports = fileDownlaod