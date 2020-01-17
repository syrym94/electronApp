const iconsRetrieve = () => {
    var exec = require('child_process').execFile;
    var fun = function () {
        exec('./iconExtractor/bin/Debug/netcoreapp3.1/iconExtractor.exe', function (err, data) {
            console.log(err)
        });
    }
    fun();
}
module.exports = iconsRetrieve