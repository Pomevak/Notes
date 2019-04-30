const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000, function(){
    console.log('listening on port 3000');
})

app.get('/sse-server', function(req, res){
    res.set({
        'connection': 'keep-alive',
        'cache-control': 'no-cache',
        'content-type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*'
    });

    const data = {
        message: 'hello world!'
    };

    setInterval(function(){
        data.timeStamp = Date.now();
        res.write(JSON.stringify(data)+'\n\n');
    }, 2000);
    //res.write(`Hello World!\n\n`);
})

http.on('connection', function(){
    console.log('a user connected!');
});

io.on('connection', function(socket){
    console.log('a user connected!');
});

setInterval(function(){
    console.log('推送消息');
    io.sockets.send('Message!');
    //io.sockets.emit('message', 'Message!');
}, 3000);