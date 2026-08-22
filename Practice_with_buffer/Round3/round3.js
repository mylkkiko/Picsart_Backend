const fs = require('fs/promises');
const path = require('path');

async function rotateLog(filePath, limitBytes) {
    try {
        const statistics = await fs.stat(filePath);
        if(statistics.size < limitBytes) {
            console.log(`${filePath} is ${statistics.size} bytes -- under the limit, no rotation needed`);
            return;
        }
        const { name, ext, dir } = path.parse(filePath);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const archiveName = `${name}-${timestamp}${ext}`;
        const newFile = path.join(dir, archiveName);
        await fs.rename(filePath, newFile);
        await fs.writeFile(filePath, '');
        console.log(`Rotated: ${filePath} -> ${newFile} (fresh log created)`);
    } catch(err) {
        if(err.code === "ENOENT") {
            console.log(`No log file yet at ${filePath} -- nothing to rotate`);
        } else {
            throw err;
        }
    }
}

rotateLog('logs/app.log', 25)