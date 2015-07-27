'use strict';

module.exports = function(app) {
	var io = app.get('socketio');
	io.on('connection', function(socket) {
		// when connecting, check if there is admin online
		io.emit('check:admin');
		
		// when server recieve online event, send back to all connected sockets event connect:admin
		socket.on('online', function() {
			io.emit('connect:admin');
		});
		socket.on('question', function(data) {
			io.emit('question', data);
		});
	});
	return io;
};