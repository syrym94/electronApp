const synchronize = async () => {
    const fs = require("fs");
    const https = require('https');
    const { promisify } = require("util");
    const copyFile = promisify(fs.copyFile)
    var _ = require('lodash');
    let serverFileStr = require('./serverFileStr.json')
    let localFileStr = {}
    function compareObj(obj1, obj2) {
        let obj1Keys = Object.keys(obj1)
        for (let key = 0; key < obj1Keys.length; key++) {
            if (obj1Keys[key] in obj2) {
                obj1[obj1Keys[key]].exist = true
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
                // console.log('path: ' + path, 'items: ' + items)
                for (let i = 0; i < items.length; i++) {
                    fs.stat(path + '/' + items[i], async (err, stats) => {
                        if (err) {
                            reject(err)
                            console.log(err)
                        }
                        // console.log('Item name: ' + items[i])
                        // console.log(path + '/' + items[i], '8888888')
                        if (stats.isDirectory()) {
                            // console.log('Is folder?:' + stats.isDirectory())
                            if (serverFileStr[path + '/' + items[i]]) {
                                // console.log(JSON.stringify(stats.mtime), JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate))
                                // console.log(serverFileStr[path + '/' + items[i]].modifDate === (JSON.stringify(stats.mtime)))
                                if (JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate).localeCompare(JSON.stringify(stats.mtime)) !== 0) {
                                    serverFileStr[path + '/' + items[i]].isEqual = false
                                } else {
                                    serverFileStr[path + '/' + items[i]].isEqual = true
                                }
                            }
                            // console.log(stats)
                            recursiveListing(path + '/' + items[i])
                        }
                        else {
                            if (serverFileStr[path + '/' + items[i]]) {
                                // console.log(JSON.stringify(stats.mtime), JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate))
                                // console.log(serverFileStr[path + '/' + items[i]].modifDate === (JSON.stringify(stats.mtime)))
                                if (JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate).localeCompare(JSON.stringify(stats.mtime)) !== 0) {
                                    serverFileStr[path + '/' + items[i]].isEqual = false
                                } else {
                                    serverFileStr[path + '/' + items[i]].isEqual = true
                                }
                            }
                            // console.log('Is folder?:' + stats.isDirectory())
                            // console.log(stats)
                        }
                        localFileStr[path + '/' + items[i]] = {
                            modifDate: stats.mtime,
                            type: stats.isDirectory() ? 'folder' : 'file'
                        }
                        if (i === items.length - 1) {
                            let resultOfComparing = compareObj(localFileStr, serverFileStr)
                            resultOfMerge = _.merge(resultOfComparing, serverFileStr)
                            // console.log(resultOfMerge, '5465431321', resultOfComparing)
                            setTimeout(() => {
                                resolve(resultOfMerge)
                            }, 1000)
                        }
                    })
                }
            })
        })
    }
    let stats =  await recursiveListing('/home/syrym/Documents/testFolder')
    // async function missingFileFetch() {
    //     // console.log(resultOfMerge)
    //     return new Promise((resolve, reject) => {
    //         try {
    //             for (let entry in resultOfMerge) {
    //                 if (!resultOfMerge[entry].exist || !resultOfMerge[entry].isEqual) {
    //                     if (resultOfMerge[entry].serverUri) {
    //                         const file = fs.createWriteStream(`${resultOfMerge[entry].serverUri.substring(resultOfMerge[entry].serverUri.lastIndexOf('/') + 1)}`);
    //                         const request = https.get(resultOfMerge[entry].serverUri, function (response) {
    //                             // response.pipe(file);
    //                             // console.log(resultOfMerge[entry].serverUri.substring(resultOfMerge[entry].serverUri.lastIndexOf('/') + 1))
    //                         });
    //                     } else {
    //                         console.log('There is no serverUri')
    //                     }
    //                 }
    //             }
    //             resolve('Downloading is done')
    //         } catch (e) {
    //             reject(e)
    //         }
    //     })
    // }
    // await missingFileFetch()
    return stats
}
module.exports = synchronize
