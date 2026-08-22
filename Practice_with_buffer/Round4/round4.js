const fs = require('fs');

async function counter(filePath) {
    let str = "";
    let wordsCount = 0;
    const stream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    try {
        for await (const chunk of stream) {
            str += chunk;
            let index = str.search(/\s\S*$/);
            let text = str.slice(0, index);
            if (index !== -1) {
                if (text.trim()) {
                    const words = text.trim().split(/\s+/);
                    wordsCount += words.length;
                }
            }
            str = str.slice(index + 1);
        }
        if (str.trim()) {
            let remainder = tail.trim().split(/\s+/);
            wordsCount += remainder.length;
        }
        const bytes = await fs.promises.stat(filePath);
        return {
            count: wordsCount,
            length: bytes.size
        }
    } catch(err) {
        throw err;
    }
}

async function run() {
    try {
        const { count, length } = await counter('file.txt');
        console.log(`Words: ${count}`);
        console.log(`Byte processed: ${length}`);
    } catch (err) {
        console.error('Cannot read the file:', err);
    }
}

run();