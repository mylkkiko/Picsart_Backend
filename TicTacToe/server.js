const net = require('node:net');
require('dotenv').config({quiet: true});

const PORT = process.env.PORT || 3000;
const clients = [];

// const board = new Array(9).fill('-');

const server = net.createServer((socket) => {
    if(clients.length >= 2) {
        socket.end("Server is full\n");
        return;
    } 
    clients.push(socket);
    console.log("New client conneсted:", socket.remoteAddress, socket.remotePort);
    if(clients.length === 2) {
        clients[0].write('You are X.');
        clients[1].write('You are O');

    } else {
        clients[0].write('Expect the second player');
    }

});

server.on('close', () => {
    clients.pop();
})

server.on('error', (err) => {
    console.log(err.message);
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on port: ${PORT}`);
})