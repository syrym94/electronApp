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
// <!DOCTYPE html>
// <html>

// <head>
//     <meta charset="UTF-8">
//     <title>Folder</title>
//     <link rel="stylesheet" type="text/css" href="mystyle.css">
//     <script>
//         class MyEmitter extends window.EventEmitter { }
//         const myEmitter = new MyEmitter();
//         const menu = new window.remote.Menu
//         const menuItem = new window.remote.MenuItem({
//             label: 'ShowInFolder',
//             click: () => {
//                 myEmitter.emit('showInFolder')
//             }
//         })
//         const menuItem2 = new window.remote.MenuItem({
//             label: 'Delete',
//             click: () => {
//                 myEmitter.emit('delete')
//             }
//         })
//         menu.append(menuItem)
//         menu.append(menuItem2)
//         window.ipcRenderer.send('folderReq')
//         window.ipcRenderer.on('folderRep', (event, files)=>{
//             let webContents = window.remote.getCurrentWindow().webContents
//             console.log(files,'4444444444')
//             function createDom(files) {
//                 for (let i = 0; i < files.length; i++) {
//                     let div = document.createElement('div')
//                     div.classList.add('container')
//                     let img = document.createElement('img')
//                     div.innerText = files[i]
//                     if (files[i].includes('.')) {
//                         div.classList.add('file')
//                     } else {
//                         div.classList.add('folder')
//                     }
//                     div.addEventListener('dblclick', (e) => {
//                         let elementToOpen = e.toElement.tagName === 'IMG' ? e.toElement.parentNode : e.toElement
//                         let textCont = e.toElement.textContent ? e.toElement.textContent : e.toElement.parentNode.textContent
//                         if (elementToOpen.classList.contains('file')) {
//                             window.ipcRenderer.send('reqFile', textCont)
//                             console.log(textCont)
//                         } else {
//                             window.ipcRenderer.send('openFolder', textCont)
//                             console.log(textCont)
//                         }
//                     })
//                     div.addEventListener('contextmenu', (e) => {
//                         e.preventDefault()
//                         let textCont = e.toElement.textContent ? e.toElement.textContent : e.toElement.parentNode.textContent
//                         myEmitter.once('showInFolder', () => {
//                             console.log(e, '987654321')
//                             window.ipcRenderer.send('context', [textCont, 'showInFolder'])
//                         })
//                         myEmitter.once('delete', () => {
//                             console.log(e, '***************')
//                             let elementToDelete = e.toElement.tagName === 'IMG' ? e.toElement.parentNode : e.toElement
//                             elementToDelete.remove()
//                             window.ipcRenderer.send('context', [textCont, 'delete'])
//                         })
//                         menu.popup(remote.getCurrentWindow())
//                     }, false)
//                     document.getElementById('files').appendChild(div)
//                     let ext = files[i].substring(files[i].lastIndexOf('.') + 1)
//                     if (files[i].includes('.')) {
//                         img.src = `../assets/${ext}.png`
//                     } else {
//                         img.src = `../assets/folder.jpg`
//                     }
//                     div.appendChild(img)
//                 }
//             }
//             createDom(files)
//         })
//     </script>
// </head>

// <body id='body'>
//     <div id="nav">
//         <button id="backward">backward</button>
//     </div>
//     <div id="files">
//     </div>
//     <script>
//         let backward = document.getElementById('backward')
//         backward.addEventListener('click', e=>{
//             console.log(window.ipcRenderer)
//             window.ipcRenderer.send('backward')
//         })
//         setInterval(() => {
//             window.ipcRenderer.send('isOnline')
//         }, 500)
//         window.ipcRenderer.on('onlineStatus', (event, isOnline) => {
//             if (isOnline) {
//                 document.getElementById('body').classList.add('online')
//                 document.getElementById('body').classList.remove('notOnline')
//             } else {
//                 document.getElementById('body').classList.add('notOnline')
//                 document.getElementById('body').classList.remove('online')
//             }
//         })
//     </script>
// </body>

// </html>