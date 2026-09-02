const net = require('node:net');
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT || 3000;
const { extractMessages } = require('./protocol');
const { createInterface } = require('node:readline');

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let symbol;

function handleServerLine(command) {
    const finalStr = command.split('|');
    switch(finalStr[0]) {
        case 'SYMBOL':
            symbol = finalStr[1];
            console.log(`You are ${symbol}`);
            break;
        case 'BOARD':
            const allStr = finalStr[1].split(',');
            const secondStr = allStr.slice(3, 6).join(' | ');
            const thirdStr = allStr.slice(6, 9).join(' | ');
            const firstStr = allStr.slice(0, 3).join(' | ');
            console.log(firstStr);
            console.log("-----------");
            console.log(secondStr);
            console.log("-----------");
            console.log(thirdStr);
            break;
        case 'TURN':
            if(finalStr[1] !== symbol) {
                console.log("The opponent’s move");
            } else {
                console.log("It’s your turn");
            }
            break;
        case 'DRAW':
            console.log("Draw");
            break;
        case 'REJECTED':
            console.log(`${finalStr[1]}`);
            break;
        case 'OPPONENT_LEFT':
            console.log("The opponent dropped out of the game");
            break;
        case 'WAIT':
            console.log("The opponent hasn’t connected yet, please wait");
            break;
        case 'WIN':
            if(finalStr[1] !== symbol) {
                console.log("The opponent won");
            } else {
                console.log("You won");
            }
            break;
    }
}

const socket = net.createConnection(PORT, () => {

})

let buffer = '';

socket.on('data', (chunk) => {
    const {mess, storage} = extractMessages(buffer, chunk);
    buffer = storage;
    for(let i = 0; i < mess.length; ++i) {
        handleServerLine(mess[i]);
    }
})

socket.on('error', (err) => {
    console.log(err.message);
});

socket.on('close', () => {
    console.log('Server disconnected');
    process.exit(0);
})

rl.on('line', (line) => {
    socket.write(`MOVE|${line}\n`);
})