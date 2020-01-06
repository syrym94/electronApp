var express = require('express')
var router = express.Router()
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
router.get('/', function (req, res) {
    // console.log(req.params)
    res.send('You did it')
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