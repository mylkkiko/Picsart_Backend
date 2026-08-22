const path = require('path');
const fs = require('fs/promises');

async function sanitizer() {
    const names = await fs.readdir('source');
    const output = await fs.mkdir('output', {recursive: true})
    for(let i = 0; i < names.length; ++i) {
        const {name, ext} = path.parse(names[i]);
        const cleanName = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const extension = ext.toLowerCase();
        const newName = cleanName + extension;
        const srcPath = path.join('source', names[i]);
        const outPath = path.join('output', newName);
        const copy = await fs.copyFile(srcPath, outPath);
    }
}

sanitizer();
