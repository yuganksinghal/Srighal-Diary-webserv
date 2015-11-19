var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res){
    res.send(200);
});

var port = process.env.PORT || 3000;

var server = app.listen (port, function() {
    console.log('Listening on port ' + port);
});
