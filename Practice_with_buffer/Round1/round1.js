const fs = require('fs/promises');

async function caesarCypher(input, shift) {
    const buffer = await fs.readFile(input);
    for(let i = 0; i < buffer.length; ++i) {
        if(buffer[i] >= 97 && buffer[i] <= 122) {
            buffer[i] = ((((buffer[i] - 97 + shift) % 26) + 26) % 26) + 97;
        } else if(buffer[i] >= 65 && buffer[i] <= 90) {
            buffer[i] = ((((buffer[i] - 65 + shift) % 26) + 26) % 26) + 65;
        } else {
            buffer[i] = buffer[i];
        }
    }
    fs.writeFile('input.txt', buffer);
}
caesarCypher('input.txt', 3);