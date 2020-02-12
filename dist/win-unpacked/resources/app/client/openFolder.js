const openFolder = (win, folder) => {
    const fileCreate = require('./fileCreate')
    fileCreate(win,folder)
}
module.exports = openFolder