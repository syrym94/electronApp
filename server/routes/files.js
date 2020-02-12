var express = require('express')
var router = express.Router()
let fileDownload = require('../../client/fileDownload')
let fileStr = require('../serverFileStr.json')
let paths = Object.keys(fileStr)
let files = []
const fs = require('fs')
for (let i = 0; i < paths.length; i++) {
    if (fileStr[paths[i]].type === 'file') {
        files.push(paths[i].substring(paths[i].lastIndexOf('/') + 1))
    }
}
// console.log(files)
// fs.writeFile('files.json',JSON.stringify(files),err=>{
//     if(err)console.log(err)
//     console.log('saved')
// })
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.get('/', function (req, res) {
    if (req.params === {}) console.log(req.params)
    res.send(files)
})
router.get('/test/*', function (req, res) {
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', 'https://my.zoomiya.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(JSON.stringify({
        success: true,
        error: false,
        data: {
            file_status: 1
        }
    }))
})
router.post('/test', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://my.zoomiya.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    let is_file_exists_arr = Object.values(fileStr).filter((item) => { 
        return item.serverUri === req.body.file_name });
    if (is_file_exists_arr.length >= 1) {
        let current_file = is_file_exists_arr[0]
        try {
            let status_id = await fileDownload(current_file.serverUri.substring(current_file.serverUri.lastIndexOf('/') + 1))
            if (status_id === 1) {
                // download & open file
                res.send(JSON.stringify({
                    success: true,
                    error: false,
                    data: {
                        file_status: status_id,
                    }
                }))
            } else if (status_id === 2) {
                // open file
                res.send(JSON.stringify({
                    success: true,
                    error: false,
                    data: {
                        file_status: status_id,
                    }
                }))
            }
            else {
                res.send(JSON.stringify({
                    success: false,
                    error: true,
                    data: {
                        file_status: status_id,
                    }
                }))
            }
        } catch (e) {
            console.log(e)
        }
        // let status_id = 1 //checkStatus(current_file)
    } else {
        res.send(JSON.stringify({
            success: false,
            error: true,
            error_message: 'File is not exists for opening'
        }))
    }
})
// router.post('/', function (req, res) {
//     connection.query(`insert into messages (html, sender, receiver,date) values ('${message.envelope['message-id']}','${bodyOfEmail}', '${from}','${to}',${parsed / 1000})`, (err, result, fields) => {
//         if (err) throw err
//         console.log(result,'Success')
//     })
// })
// router.put('/:id', function (req, res) {
//     let reqFields = Object.keys(req.body)
//     connection.query(`update messages set ${reqFields[0]} = '${req.body.html}', ${reqFields[1]} = '${req.body.header}', updated = ${new Date().getTime()} WHERE message_id = ${req.params.id}`, (err, result, fields) => {
//         if (err) throw err
//         res.send(result)
//     })
// })
// router.delete('/:id', function (req, res) {
//     connection.query(`delete from messages where message_id = ${req.params.id}`, (err, result, fields) => {
//         if (err) throw err
//         res.send(result)
//     })
// })
// router.delete('/', function (req, res) {
//     connection.query(`delete from messages`, (err, result, fields) => {
//         if (err) throw err
//         res.send(result)
//     })
// })
module.exports = router