const http = require('node:http');
require('dotenv').config({ quiet: true });
const PORT = process.env.PORT || 4001;

function readBody(req, callback) {
    let buffer = '';
    req.on('data', (chunk) => {
        buffer += chunk.toString();
    });
    req.on('end', () => {
        callback(buffer);
    });
}

const resources = {
    notes: {
        items: [],
        nextId: 1,
        fields: ['title', 'content'],
        required: ['title', 'content'],
        defaults: {},
        label: 'Note'
    },
    tasks: {
        items: [], 
        nextId: 1,
        fields: ['title', 'completed'],
        required: ['title'],
        defaults: { completed: false },
        label: 'Task'
    },
    contacts: {
        items: [], 
        nextId: 1,
        fields: ['name', 'email', 'phone'],
        required: ['name', 'email'],
        defaults: { phone: null },
        label: 'Contact'
    }
};

function send(res, code, payload, headers = {}) {
    res.writeHead(code, { 'Content-Type': 'application/json', ...headers });
    res.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const segment = url.pathname.split('/').filter(Boolean);
    readBody(req, (body) => {
        try {
            let data = null;
            if (body) {
                try {
                    data = JSON.parse(body);
                } catch {
                    return send(res, 400, { error: "Invalid JSON" });
                }
            }
            const resource = resources[segment[0]];
            if (!resource) {
                return send(res, 404, { error: "Not found" })
            }
            const id = segment[1] ? Number(segment[1]) : null;
            if (req.method === 'GET' && !segment[1]) {
                return send(res, 200, resource.items);
            } else if (req.method === 'GET' && segment[1]) {
                const note = resource.items.find(n => n.id === id);
                if (!note) {
                    return send(res, 404, { error: `${resource.label} with id ${id} not found` });
                } else {
                    return send(res, 200, note);
                }
            } else if (req.method === 'POST' && !segment[1]) {
                if(!body) {
                    return send(res, 400, { error: "Invalid JSON" });
                }
                for(const field of resource.required) {
                    if (data[field] === undefined) {
                        return send(res, 400, { error: `Incorrect ${field}` });
                    }
                }
                let newNote = {id: resource.nextId, ...resource.defaults};
                for(const field of resource.fields) {
                    if(data[field] !== undefined) {
                        newNote[field] = data[field];
                    }
                }
                resource.nextId++;
                resource.items.push(newNote);
                return send(res, 201, newNote);
            } else if (req.method === 'DELETE' && segment[1]) {
                const index = resource.items.findIndex(n => n.id === id);
                if (index !== -1) {
                    resource.items.splice(index, 1);
                    return send(res, 200, { deleted: id });
                } else {
                    return send(res, 404, { error: `${resource.label} with id ${id} not found` });
                }
            } else if (req.method === 'PUT' && segment[1]) {
                if(!body) {
                    return send(res, 400, { error: 'Invalid JSON' });
                }
                const note = resource.items.find(n => n.id === id);
                if (!note) {
                    return send(res, 404, { error: `${resource.label} with id ${id} not found` });
                } else {
                    for(const field of resource.fields) {
                        if(data[field] !== undefined) {
                            note[field] = data[field];
                        }
                    }
                    return send(res, 200, note);
                }
            } else {
                return send(res, 405, { error: 'Method not allowed' }, { 'Allow': 'GET, POST, PUT, DELETE' });
            }
        } catch (err) {
            console.error(err);
            send(res, 500, { error: 'Internal server error' });
        }
    })
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port: ${PORT}`);
})