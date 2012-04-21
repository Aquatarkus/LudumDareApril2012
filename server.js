// setup app server
var express = require('express');
var app =   express.createServer(
            express.logger(),
            express.directory(__dirname+'/'),
            express.static(__dirname + '/'),
            express.favicon(__dirname+'/favicon.ico')
);
app.listen(8000); // production