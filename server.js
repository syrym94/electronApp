const server = ()=>{
        var express = require('express');
        var app = express();
        var cors = require('cors')
        let messages = require('./routes/messages')
        bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use('/messages',messages)
        app.enable('trust proxy')
        app.use(cors())
        app.listen(4000, '0.0.0.0', function() {
                console.log('Listening to port:  ' + 4000);
        });
}
module.exports = server