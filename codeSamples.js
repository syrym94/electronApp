// const exec = require('child_process').exec
// let folder = strArr[dir].substring(strArr[dir].indexOf('/'), strArr[dir].lastIndexOf('/'))

// function processDetect() {
//     console.log('monitoring whether any file in directory is opened')
//     exec(`ps -aef | grep -v "grep" | grep -i "/home/syrym/Documents/electronTUT${folder}" | awk '{print $2,$9}'`, async(err, stdout, stderr) => {
//         if (stdout !== '') {
//             let pid = stdout.substring(stdout.lastIndexOf('/home'), 0).trim()
//             let openedFile = stdout.substring(stdout.lastIndexOf('/home'))
//                 // console.log(openedFile)
//             if (`/home/syrym/Documents/electronTUT${strArr[dir]}` === openedFile.trim()) {
//                 fs.stat(`${openedFile.trim()}`, (err, stats) => {
//                     if (err) console.log(err)
//                         // console.log(stats)
//                     if (stats.size <= 4) {
//                         myEmitter.emit('event', pid, serverFileStr[strArr[dir]].serverUri, openedFile);
//                         notifier.notify({
//                                 title: 'File is empty',
//                                 message: 'Please wait file to be downloaded'
//                             })
//                             // clearInterval(interval)
//                     }
//                 })
//             }
//         } else {
//             console.log('no files are opened')
//         }
//         // console.log(stdout)
//     })
// }
// let interval = setInterval(processDetect, 500)
// myEmitter.on('event', (pid, serverUri, openedFile) => {
//     // console.log(`${dir} was opened`)
//     clearInterval(interval)
//     const file = fs.createWriteStream(`${openedFile.trim()}`);
//     // console.log(`/home/syrym/Documents/electronTUT${dir}` === openedFile.trim())
//     exec(`kill ${pid}`)
//     const request = https.get(serverUri, function(response) {
//         response.pipe(file);
//         file.on('finish', function() {
//             file.close();
//             console.log('File writing is over')
//             notifier.notify({
//                 title: 'Downloading is over',
//                 message: 'File is ready to be opened'
//             })
//             interval = setInterval(processDetect, 500)
//         });
//     }).on("error", err => {
//         console.log(err)
//         fs.unlink(`${openedFile.trim()}`, err => {
//             console.log(err)
//         })
//     })
// });

// function compareObj(obj1, obj2) {
//     let obj1Keys = Object.keys(obj1)
//     for (let key = 0; key < obj1Keys.length; key++) {
//         if (obj1Keys[key] in obj2) {
//             obj1[obj1Keys[key]].exist = true
//                 // console.log(typeof obj1[obj1Keys[key]].modifDate)
//         } else {
//             obj1[obj1Keys[key]].exist = false
//         }
//         if (key === obj1Keys.length - 1) {
//             return obj1
//         }
//     }
// }
// let resultOfMerge

// function recursiveListing(path) {
//     return new Promise((resolve, reject) => {
//         fs.readdir(path, (err, items) => {
//             if (err) {
//                 reject(err)
//                 console.log(err)
//             }
//             // console.log(serverFileStr, '/////////')
//             // console.log('path: ' + path, 'items: ' + items)
//             for (let i = 0; i < items.length; i++) {
//                 fs.stat(path + '/' + items[i], async(err, stats) => {
//                     if (err) {
//                         reject(err)
//                         console.log(err)
//                     }
//                     // console.log('Item name: ' + items[i])
//                     // console.log(path + '/' + items[i], '8888888')
//                     if (stats.isDirectory()) {
//                         // console.log('Is folder?:' + stats.isDirectory())
//                         if (serverFileStr[path + '/' + items[i]]) {
//                             // console.log(JSON.stringify(stats.mtime), JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate))
//                             // console.log(serverFileStr[path + '/' + items[i]].modifDate === (JSON.stringify(stats.mtime)))
//                             if (JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate).localeCompare(JSON.stringify(stats.mtime)) !== 0) {
//                                 serverFileStr[path + '/' + items[i]].isEqual = false
//                             } else {
//                                 serverFileStr[path + '/' + items[i]].isEqual = true
//                             }
//                         }
//                         // console.log(stats)
//                         recursiveListing(path + '/' + items[i])
//                     } else {
//                         if (serverFileStr[path + '/' + items[i]]) {
//                             // console.log(JSON.stringify(stats.mtime), JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate))
//                             // console.log(serverFileStr[path + '/' + items[i]].modifDate === (JSON.stringify(stats.mtime)))
//                             if (JSON.stringify(serverFileStr[path + '/' + items[i]].modifDate).localeCompare(JSON.stringify(stats.mtime)) !== 0) {
//                                 serverFileStr[path + '/' + items[i]].isEqual = false
//                             } else {
//                                 serverFileStr[path + '/' + items[i]].isEqual = true
//                             }
//                         }
//                         // console.log('Is folder?:' + stats.isDirectory())
//                         // console.log(stats)
//                     }
//                     // console.log(serverFileStr, '*******************')
//                     localFileStr[path + '/' + items[i]] = {
//                             modifDate: stats.mtime,
//                             type: stats.isDirectory() ? 'folder' : 'file'
//                         }
//                         // console.log(localFileStr)
//                     if (i === items.length - 1) {
//                         let resultOfComparing = compareObj(localFileStr, serverFileStr)
//                         resultOfMerge = _.merge(resultOfComparing, serverFileStr)
//                             // console.log(localFileStr, '5465431321', serverFileStr, '///////////////////')
//                         setTimeout(() => {
//                             resolve(resultOfMerge)
//                         }, 1000)
//                     }
//                 })
//             }
//         })
//     })
// }
// let stats = await recursiveListing('./syrym/Documents/testFolder')
//     // console.log(stats)
//     // async function missingFileFetch() {
//     //     // console.log(resultOfMerge)
//     //     return new Promise((resolve, reject) => {
//     //         try {
//     //             for (let entry in resultOfMerge) {
//     //                 if (!resultOfMerge[entry].exist || !resultOfMerge[entry].isEqual) {
//     //                     if (resultOfMerge[entry].serverUri) {
//     //                         const file = fs.createWriteStream(`${resultOfMerge[entry].serverUri.substring(resultOfMerge[entry].serverUri.lastIndexOf('/') + 1)}`);
//     //                         const request = https.get(resultOfMerge[entry].serverUri, function (response) {
//     //                             // response.pipe(file);
//     //                             // console.log(resultOfMerge[entry].serverUri.substring(resultOfMerge[entry].serverUri.lastIndexOf('/') + 1))
//     //                         });
//     //                     } else {
//     //                         console.log('There is no serverUri')
//     //                     }
//     //                 }
//     //             }
//     //             resolve('Downloading is done')
//     //         } catch (e) {
//     //             reject(e)
//     //         }
//     //     })
//     // }
//     // await missingFileFetch()
// return stats