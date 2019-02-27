
const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('encodeData', (data) => {
    console.log('client is encode the ', data);
    const result = new Buffer(data).toString('base64');
    client.emit('encoder', result);
  })
});

const port = process.env.PORT || 8000;
io.listen(port);
console.log('listening on port ', port);
