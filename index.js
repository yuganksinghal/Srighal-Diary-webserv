var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require ('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db = process.env.DATABASE_URL || 'postgres://vdmhzgburvczes:4a6UvEgPzqmLNlwAIYpG8NedO9@ec2-54-83-199-54.compute-1.amazonaws.com:5432/de8llitlsbuufv?ssl=true'

pg.connect(db, function(err, client){
    if (err) throw err;

    client.query('DROP TABLE diary');
    client.query('CREATE TABLE diary(ID CHAR(36) PRIMARY KEY NOT NULL,TITLE CHAR(100) NOT NULL, ENTRY TEXT, GEOCACHE TEXT, ENTRYDATE TEXT);');
    
    app.get('/entry/all', function(req,res){
        console.log("GET");
        var queryResult;
        client.query('SELECT * FROM diary', function(err, result){
            var queryResult=result.rows;
            console.log(result.rows);
            res.send(JSON.stringify(queryResult));
        });
    });
    
    app.get('/entry/:id', function(req, res){
        var id = req.param.id;
        var queryResult;
        client.query('SELECT * FROM diary where id = ' + id, function(err, result){
            queryResult=result.rows;
            console.log(result.rows);
            res.send(JSON.stringify(queryResult));
        });
    });
    
    app.post('/entry/:id/save', function(req,res){
        console.log("POST");
        console.log(req.body);
        var entryObject = req.body;
        var id = req.param.id;
        entryObject.title=entryObject.title.replace(/'/g, "''");
        entryObject.entry=entryObject.entry.replace(/'/g, "''");
        console.log("UPDATE diary TITLE = \'" + entryObject.title +'\', ENTRY = \'' + entryObject.entry +'\', GEOCACHE = \'' + entryObject.geocache + '\' , ENTRYDATE = \'' + entryObject.entrydate +'\' WHERE ID = \' ' + entryObject.id.mUuid + ');');
        client.query("UPDATE diary TITLE = \'" + entryObject.title +'\', ENTRY = \'' + entryObject.entry +'\', GEOCACHE = \'' + entryObject.geocache + '\' , ENTRYDATE = \'' + entryObject.entrydate +'\' WHERE ID = \' ' + entryObject.id.mUuid + ');');
        res.sendStatus(200);
    });
    
     app.post('/entry/new', function(req,res){
        console.log("POST");
        console.log(req.body);
        var entryObject = req.body;
        entryObject.title=entryObject.title.replace(/'/g, "''");
        entryObject.entry=entryObject.entry.replace(/'/g, "''");
        console.log("INSERT INTO diary VALUES(\'" + entryObject.id.mUuid + '\', \'' + entryObject.title +'\', \'' + entryObject.entry +'\', \'' + entryObject.geocache + '\' , \'' + entryObject.entrydate+'\');');
        client.query('INSERT INTO diary VALUES(\'' + entryObject.id.mUuid + '\', \'' + entryObject.title +'\', \'' + entryObject.entry +'\', \'' + entryObject.geocache + '\' , \'' + entryObject.entrydate+'\');');
        res.sendStatus(200);
    });
});

var port = process.env.PORT || 3000;

var server = app.listen (port, function() {
    console.log('Listening on port ' + port);
});
