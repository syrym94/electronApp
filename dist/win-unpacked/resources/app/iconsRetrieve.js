const iconsRetrieve = () => {
    var exec = require('child_process').exec;
    exec(`${__dirname}\\iconExtractor\\bin\\Debug\\netcoreapp3.1\\iconExtractor.exe`, function (err, data) {
            if(err) console.log(err)
    });
    }
module.exports = iconsRetrieve