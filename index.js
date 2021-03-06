const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    // res.send('<h1>Hello World!</h1>');
    res.sendFile(__dirname+'/index.html');
})

io.on('connection', function(socket) {
    console.log('a user connected '+socket.id);
    socket.on('chat message', function(msg) {
        console.log('message: '+msg);
        io.emit('chat message', msg);
    })



    socket.on('disconnect', function() {
        console.log(`user ${socket.id} is not disconnected`);
    })
})

http.listen(3000, function() {
    console.log('listening on the port 3000');
})