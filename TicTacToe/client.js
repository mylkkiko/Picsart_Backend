const net = require('node:net');
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT || 3000;

const client = net.createConnection(PORT, () => {

})

client.on('error', (err) => {
    console.log(err.message);
});

function handleCommand(socket, user, message) {
    if
}

client.on('data', (chunk) => {

})