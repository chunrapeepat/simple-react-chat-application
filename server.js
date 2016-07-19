var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
	socket.on('message', function(data){
		console.log(data);
		io.emit('response-message', data);
	});
	io.emit('welcome', '[Server]: We have new 1 connection!.');
});

http.listen('3000', function(){
	console.log('Server has been start on port 3000!.');
});