const synchronize = async() => {
    const fs = require("fs");
    const https = require('https');
    const { promisify } = require("util");
    const copyFile = promisify(fs.copyFile)
    var _ = require('lodash');
    let serverFileStr = require('./serverFileStr.json')
    let localFileStr = {}
    let compared

    function compareObj(obj1, obj2) {
        let obj1Keys = Object.keys(obj1)
        for (let key = 0; key < obj1Keys.length; key++) {
            // console.log(obj1Keys[key], obj1Keys[key] in obj2)
            if (obj1Keys[key] in obj2) {
                obj1[obj1Keys[key]].exist = true
                    // console.log(typeof obj1[obj1Keys[key]].modifDate)
            } else {
                obj1[obj1Keys[key]].exist = false
            }
            if (key === obj1Keys.length - 1) {
                return obj1
            }
        }
    }
    let resultOfMerge

    function recursiveListing(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, items) => {
                if (err) {
                    reject(err)
                    console.log(err)
                }
                // console.log(serverFileStr, '/////////')
                // console.log('path: ' + path, 'items: ' + items)
                for (let i = 0; i < items.length; i++) {
                    fs.stat(path + '/' + items[i], async(err, stats) => {
                        if (err) {
                            reject(err)
                            console.log(err)
                        }
                        // console.log('Item name: ' + items[i])
                        // console.log(path + '/' + items[i], '8888888')
                        if (stats.isDirectory()) {
                            recursiveListing(path + '/' + items[i])
                        } else {
                            // console.log(JSON.stringify(stats.mtime), JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate))
                            // console.log(serverFileStr[path + '/' + items[i]].modifDate === (JSON.stringify(stats.mtime)))
                            if (JSON.stringify(serverFileStr[path.slice(1) + '/' + items[i]].modifDate).localeCompare(JSON.stringify(stats.mtime)) !== 0) {
                                serverFileStr[path.slice(1) + '/' + items[i]].isEqual = false
                                    // console.log(Date.parse(serverFileStr[path.slice(1) + '/' + items[i]].modifDate), Date.parse(stats.mtime))
                                if (Date.parse(serverFileStr[path.slice(1) + '/' + items[i]].modifDate) > Date.parse(stats.mtime)) {
                                    console.log('server is newer', [path.slice(1) + '/' + items[i]])
                                        // downloading from server
                                    const file = fs.createWriteStream(`${(path.slice(1) + '/' + items[i]).lastIndexOf('/') + 1}`);
                                    const request = https.get(serverFileStr[path.slice(1) + '/' + items[i]].serverUri, function(response) {
                                        response.pipe(file);
                                        file.on('finish', function() {
                                                file.close(); // close() is async, call cb after close completes.
                                                console.log(`${(path.slice(1) + '/' + items[i]).lastIndexOf('/') + 1}`, 'File writing is over')

                                            }).on('error', err => {
                                                console.log(err)
                                            })
                                            // console.log(resultOfMerge[entry].serverUri.substring(resultOfMerge[entry].serverUri.lastIndexOf('/') + 1))
                                    });
                                } else {
                                    console.log('locale is newer')
                                        // uploading to server
                                }
                            } else {
                                serverFileStr[path.slice(1) + '/' + items[i]].isEqual = true
                            }
                            // console.log('Is folder?:' + stats.isDirectory())
                            // console.log(stats)
                        }
                        // console.log(serverFileStr, '*******************')
                        localFileStr[path.slice(1) + '/' + items[i]] = {
                                modifDate: stats.mtime,
                                type: stats.isDirectory() ? 'folder' : 'file'
                            }
                            // console.log(localFileStr)
                        if (i === items.length - 1) {
                            let resultOfComparing = compareObj(localFileStr, serverFileStr)
                            resultOfMerge = _.merge(resultOfComparing, serverFileStr)
                            setTimeout(() => {
                                // console.log(resultOfComparing)
                                resolve(resultOfMerge)
                            }, 1000)
                        }
                    })
                }
            })
        })
    }
    let stats = await recursiveListing('./syrym/Documents/testFolder')
    return (stats)
}
module.exports = synchronize