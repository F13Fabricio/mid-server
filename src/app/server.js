require('dotenv').config();

const app = require('./app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { vote } = require('./services/votation.service');

server.listen(process.env.PORT || 3000, () => {
  console.log('Server started!');
});

io.on('connection', (socket) => {
  socket.on('votation', async (msg) => {
    await vote(msg.placeId);
    socket.broadcast.emit('votation', msg);
  });
});
