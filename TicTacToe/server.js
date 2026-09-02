const net = require('node:net');
require('dotenv').config({ quiet: true });
const { extractMessages } = require('./protocol');
const PORT = process.env.PORT || 3000;
const clients = [];
const board = new Array(9).fill('_');
let currentTurn = 'X';
let gameOver = false;

const LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

function victoryCheck(symbol) {
    for (const line of LINES) {
        const [a, b, c] = line;
        if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
            return true;
        }
    }
    return false;
}

function sendMessage(text) {
    for(const client of clients) {
        client.write(text);
    }
}

const server = net.createServer((socket) => {
    if (clients.length >= 2) {
        socket.end("Server is full\n");
        return;
    }
    let buffer = '';
    clients.push(socket);
    console.log("New client conneсted:", socket.remoteAddress, socket.remotePort);
    const boardLine = `BOARD|${board.join(',')}\n`;
    if (clients.length === 2) {
        clients[0].write('SYMBOL|X\n');
        clients[0].write(`${boardLine}`);
        clients[0].write('TURN|X\n');

        clients[1].write('SYMBOL|O\n');
        clients[1].write(`${boardLine}`);
        clients[1].write('TURN|X\n');
    } else {
        clients[0].write('WAIT\n');
    }

    socket.on('data', (chunk) => {
        const { mess, storage } = extractMessages(buffer, chunk);
        buffer = storage;
        const index = clients.indexOf(socket);
        const symbol = index === 0 ? 'X' : 'O';
        for (let i = 0; i < mess.length; ++i) {
            const parts = mess[i].split('|');
            if (parts[0] !== "MOVE") {
                continue;
            }
            if(gameOver) {
                socket.write("REJECTED|game over, start new\n");
                continue;
            }
            if (symbol !== currentTurn) {
                socket.write("REJECTED|not your turn\n");
                continue;
            }
            if(!parts[1] || parts[1].trim() === '') {
                socket.write("REJECTED|invalid cell\n");
                continue;
            }
            let cellNumber = Number(parts[1]);
            if (!Number.isInteger(cellNumber) || !(cellNumber >= 0 && cellNumber <= 8)) {
                socket.write("REJECTED|invalid cell\n");
                continue;
            }
            if (board[cellNumber] !== '_') {
                socket.write("REJECTED|cell taken\n");
                continue;
            }
            board[cellNumber] = symbol;
            sendMessage(`BOARD|${board.join(',')}\n`);
            if (victoryCheck(symbol)) {
                sendMessage(`WIN|${symbol}\n`);
                gameOver = true;
                for(const client of clients) {
                    client.end('GAME_OVER|game over, start new\n');
                }
            } else if (board.every(sym => sym !== '_')) {
                sendMessage('DRAW\n');
                gameOver = true;
                for(const client of clients) {
                    client.end('GAME_OVER|game over, start new\n');
                }
            } else {
                currentTurn = currentTurn === 'X' ? 'O' : 'X';
                sendMessage(`TURN|${currentTurn}\n`);
            }
        }
    })

    socket.on('close', () => {
        const dropped = clients.indexOf(socket);
        clients.splice(dropped, 1);
        if(!gameOver) {
            sendMessage(`OPPONENT_LEFT\n`);
        }
        for(let i = 0; i < board.length; ++i) {
            board[i] = '_';
        }
        currentTurn = 'X';
        gameOver = false;
    })

    socket.on('error', (err) => {
        console.log(err.message);
    })
});

server.on('error', (err) => {
    console.log(err.message);
})

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running on port: ${PORT}`);
})