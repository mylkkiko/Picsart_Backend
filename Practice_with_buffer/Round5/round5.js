const { EventEmitter } = require("node:events");

class Downloader extends EventEmitter {
    constructor() {
        super();
        this.progress = 0;
        this.timerId = null;
    }

    start() {
        this.timerId = setInterval(() => {
            this.progress += 10;
            this.emit('progress', this.progress)
            if(this.progress === 100) {
                clearInterval(this.timerId);
                this.emit('done');
            }
        }, 1000);
    }
}

const downloader = new Downloader();

downloader.on('progress', (percentage) => {
    let countOfCells = percentage / 5;
    process.stdout.write(`\r[${'#'.repeat(countOfCells)}${'-'.repeat(20 - countOfCells)}] ${percentage}%`);
})

downloader.on('done', () => {
    process.stdout.write('\nDownload complete!\n')
})

downloader.start();