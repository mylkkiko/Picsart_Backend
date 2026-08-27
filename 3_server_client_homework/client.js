const net = require('node:net');
const { createInterface } = require('node:readline');
const { extractMessages } = require('./protocol');
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT || 3000;

const rl = createInterface({
    input: process.stdin, 
    output: process.stdout,
});

const socket = net.createConnection(PORT, () => {
    
});

let buffer = '';

socket.on('data', (chunk) => {
    const {mess, storage} = extractMessages(buffer, chunk);
    buffer = storage;
    for(let i = 0; i < mess.length; ++i) {
       console.log(mess[i]);
    }
});

socket.on('close', () => {
    console.log('Server disconnected');
    process.exit(0);
});

socket.on('error', (err) => {
    console.log(err.message);
});

rl.on('line', (line) => {
    socket.write(`${line}\n`);
})
