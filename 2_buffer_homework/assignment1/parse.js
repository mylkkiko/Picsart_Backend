const fs = require('node:fs');

const buffer = fs.readFileSync('records.bin');
let mostActiveId = null;
let maxCount = 0;
try {
    if(buffer.toString('utf-8', 0, 4) !== "SNSR" ) {
        throw new Error("Your magic is wrong!");
    }
    if(buffer.readUInt8(4) !== 1) {
        throw new Error("Your version is wrong!");
    }
    console.log(`File format valid (SNSR v${buffer.readUInt8(4)})`);
    const length = buffer.readUInt16BE(5);
    const records = [];
    let totalTemp = 0;
    const sensorCount = new Map();
    for(let i = 0; i < length; ++i) {
        let offset = 7 + i * 9;
        let timestamp = buffer.readUInt32BE(offset);
        let temperature = buffer.readFloatBE(offset + 4);
        let sensorId = buffer.readUInt8(offset + 8);
        records.push({timestamp: new Date(timestamp * 1000), temperature: temperature, sensorId: sensorId });
        totalTemp += temperature;
        sensorCount.set(sensorId, (sensorCount.get(sensorId) || 0) + 1);
    }
    const avTemperature = totalTemp / records.length;
    for(const [sensorId, count] of sensorCount) {
        if(count > maxCount) {
            maxCount = count;
            mostActiveId = sensorId;
        }
    }
    console.log(`Records parsed: ${records.length}`);
    console.log(`Average temperature: ${avTemperature.toFixed(2)}°C`);
    console.log(`Most active sensor: #${mostActiveId} (${maxCount} readings)`);
} catch(err) {
    console.error("Error during file reading: ", err.message);
}