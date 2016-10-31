var express = require('express'),
	app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'),
    path = require('path');

var datas = {
	question: 'Aimez-vous React ?',
	answers: {
		yes: 'Bon choix !',
		no: 'Zut !'
	} 
};


app.use(express.static(path.resolve('../../bin')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('../../index.html'));
});

io.sockets.on('connection', function (socket, pseudo) {
    socket.emit('datas', JSON.stringify(datas)); 
});

server.listen(3000);