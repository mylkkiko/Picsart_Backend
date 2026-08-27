const net = require('node:net');
const fs = require('node:fs');
const { extractMessages } = require('./protocol');
require('dotenv').config({ quiet: true });

const PORT = process.env.PORT || 3000;
const users = new Map();
const logStream = fs.createWriteStream('chat.log', { flags: 'a' });
logStream.on('error', (err) => console.log('Log error: ', err.message));

function broadcast(text, clienName) {
    for (const [name, sock] of users) {
        if (name !== clienName) {
            sock.write(text);
        }
    }
}

function handleCommand(socket, userName, message) {
    const parts = message.split(' ');
    if (parts[0] === '/msg') {
        const target = users.get(parts[1]);
        if (!target) {
            socket.write("Unknown user\n");
        } else {
            const finalText = parts.slice(2).join(' ');
            target.write(`[DM from ${userName}]: ${finalText}\n`)
            socket.write(`[you -> ${parts[1]}]: ${finalText}\n`);
        }
    } else if (parts[0] === '/who') {
        const connectedUsers = [...users.keys()].join(', ');
        socket.write(`Connected users: ${connectedUsers}\n`)
    } else if (parts[0] === '/quit') {
        socket.end('Goodbye!\n')
    } else {
        socket.write("Unknown command\n");
    }
}

const server = net.createServer((socket) => {
    console.log("New client conneсted:", socket.remoteAddress, socket.remotePort);
    socket.write("Please, enter your name:\n ");
    let buffer = '';
    let userName = null;

    socket.on('data', (chunk) => {
        const { mess, storage } = extractMessages(buffer, chunk);
        buffer = storage;
        for (let i = 0; i < mess.length; ++i) {
            if (userName === null) {
                let name = mess[i].trim();
                if (!name) {
                    socket.write("The username should not be empty\n");
                } else if (users.has(name)) {
                    socket.write("Such a username already exists\n");
                } else {
                    userName = name;
                    broadcast(`*** ${userName} joined ***\n`, userName);
                    users.set(userName, socket);
                    socket.write("Connected as " + userName + '\n');
                }
            } else if (mess[i].startsWith('/')) {
                handleCommand(socket, userName, mess[i])
            } else {
                const time = new Date().toLocaleTimeString();
                const line = `[${time}] [${userName}]: ${mess[i]}\n`;
                logStream.write(line);
                console.log(line.trim());
                broadcast(line, userName)
            }
        }
    });

    socket.on('close', () => {
        if (users.has(userName)) {
            users.delete(userName);
            broadcast(`*** ${userName} left ***\n`)
        }
        console.log("Client disconnected");
    });

    socket.on('error', (err) => {
        console.log("Socket error: ", err.message);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is runnig on port ${PORT}`);
})
