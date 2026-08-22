const fs = require('node:fs/promises');
const env = process.argv[2]; 
const base = 'config.base.json';

async function readAnyFile(filePath) {
   return await fs.readFile(filePath, 'utf-8');
}

async function configMerger(file) {
   if (!file) {
      console.error("You need to write the file name: node filename.js <environment>")
      process.exit(1);
   }
   try {
      const template = `config.${file}.json`;
      const baseText = await readAnyFile(base);
      const envText = await readAnyFile(template);
      const objBase = JSON.parse(baseText);
      const envObj = JSON.parse(envText);
      // for(const key of )
      console.log(objBase, envObj);
   } catch(err) {
      if(err.code === 'ENOENT') {
         console.error(`No file with name ${file}`);
      }
   }
}

configMerger(env);
