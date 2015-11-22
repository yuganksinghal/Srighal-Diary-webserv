var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require ('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = process.env.DATABASE_URL || 'postgres://vdmhzgburvczes:4a6UvEgPzqmLNlwAIYpG8NedO9@ec2-54-83-199-54.compute-1.amazonaws.com:5432/de8llitlsbuufv?ssl=true'

pg.connect(db, function(err, client){
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client.query('DROP TABLE DIARY');
    client
    .query('CREATE TABLE DIARY(ID SERIAl PRIMARY KEY NOT NULL, TITLE CHAR(100) NOT NULL, DIARY_CONTENT TEXT);');
});

app.get('/', function(req,res){
    res.send(200);
});

app.post('/submitentry', function(req,res){
    console.log("POST");
    console.log(req.body);
    res.send(200);
});

var port = process.env.PORT || 3000;

var server = app.listen (port, function() {
    console.log('Listening on port ' + port);
});
