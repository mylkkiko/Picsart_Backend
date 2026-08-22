const data = [
    { 
        timestamp: 1773312000, 
        temperature: 21.5,
        sensorId: 1 
    },

    { 
        timestamp: 1773312300, 
        temperature: 22.1,
        sensorId: 2 
    },

    { 
        timestamp: 1773312600, 
        temperature: 19.8,
        sensorId: 3 
    },

    { 
        timestamp: 1773312900, 
        temperature: 21.0,
        sensorId: 1 
    },

    { 
        timestamp: 1773313200, 
        temperature: 23.4,
        sensorId: 2 
    },

    { 
        timestamp: 1773313500, 
        temperature: 20.2,
        sensorId: 3 
    },

    { 
        timestamp: 1773313800,
        temperature: 21.8, 
        sensorId: 1 
    },
    
    { 
        timestamp: 1773314100,
        temperature: 22.5, 
        sensorId: 2 
    },
    
    { 
        timestamp: 1773314400,
        temperature: 19.5, 
        sensorId: 3 
    },
    
    { 
        timestamp: 1773314700,
        temperature: 21.2, 
        sensorId: 1 
    }
];

let size = 7 + (data.length * 9);
const buffer = Buffer.alloc(size);
buffer.write("SNSR");
buffer.writeUInt8(1, 4);
buffer.writeUInt16BE(data.length, 5);

for(let i = 0; i < data.length; ++i) {
    let offset = 7 + i * 9;
    buffer.writeUInt32BE(data[i].timestamp, offset);
    buffer.writeFloatBE(data[i].temperature, offset + 4);
    buffer.writeUInt8(data[i].sensorId, offset + 8);
}

const fs = require('fs');
fs.writeFileSync("records.bin", buffer);