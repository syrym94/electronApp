const showInFolder = require('./showInFolder')
const deleteFile = require('./deleteFile')
const context = (obj) => {
    switch (obj[1]) {
        case 'showInFolder':
            console.log('showInFolder')
            showInFolder(obj[0])
            break;
        case 'delete':
            console.log('delete')
            deleteFile(obj[0])
            break;
        default:
            console.log('default')
    }

}
module.exports = context