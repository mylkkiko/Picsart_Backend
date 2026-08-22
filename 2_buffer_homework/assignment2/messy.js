const fs = require('node:fs/promises');
const path = require('node:path');

async function fileExists(filepath) {
    try {
        await fs.access(filepath);
        return true;
    } catch {
        return false
    }
}

async function fileOrganizer(targetFolder) {
    const dirFiles = process.argv[2];
    targetFolder = process.argv[3];
    const files = await fs.readdir(dirFiles, {recursive: true, withFileTypes: true});
    for(let i = 0; i < files.length; ++i) {
        if(files[i].isFile()) {
            const {name, ext} = path.parse(files[i].name);
            let category;
            if(name.startsWith('.')) {
                category = 'hidden';
            } else if(ext) {
                category = ext.slice(1);
            } else {
                category = 'no-extension';
            }
            const src = path.join(files[i].parentPath, files[i].name);
            const dest = path.join(targetFolder, category, files[i].name);
            const newDir = await fs.mkdir(path.join(targetFolder, category), {recursive: true});
            let finalDest = dest;
            let count = 1;
            while(await fileExists(finalDest)) {
                finalDest = path.join(targetFolder, category, `${name}_${count}${ext}`);
                count++;
            }
            await fs.copyFile(src, finalDest);
        }
    }
}

fileOrganizer();