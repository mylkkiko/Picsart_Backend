function extractMessages(buffer, chunk) {
    let arr = buffer + chunk;
    let mess = arr.split('\n');
    let storage = mess.pop();
    return {mess, storage};
}

module.exports = { extractMessages };