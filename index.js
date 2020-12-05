var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('typing', () => {
    console.log('typing');
  })

  // socket.on('typing', (data) => {
  //   if(data.typing == true) {
  //     io.emit('display', data)
  //   } else {
  //     io.emit('display', data)
  //   }
  // })

  socket.on('display', (data) => {
    if(data.typing == true) {
      $('.typing').text(`${data.user}`)
    } else {
      $('.typing').text("")
    }
  })
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
