const { Server } = require('socket.io');
const io = new Server();
const jwt = require('jsonwebtoken');

var Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};

io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, process.env.HASH, function(err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }    
}).on('connection', function(socket) {
    socket.join('1311000000000000000')
});

exports.Socket = Socket;
exports.io = io;