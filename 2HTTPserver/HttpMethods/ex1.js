//Remember
//✅ Browsers cannot send POST, PUT, DELETE requests directly by typing in the address bar.
// ✅ They can only send GET requests when you type the URL.


const http = require('http');
const url = require('url');

let database = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Set header for JSON response
    res.setHeader('Content-Type', 'application/json');

    // GET - Read data
    if (method === 'GET' && path === '/items') {
        res.writeHead(200);
        res.end(JSON.stringify(database));
    }

    // POST - Create new data
    else if (method === 'POST' && path === '/items') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newItem = JSON.parse(body);
            newItem.id = database.length + 1;
            database.push(newItem);
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'Item Created', item: newItem }));
        });
    }

    // PUT - Update existing data
    else if (method === 'PUT' && path.startsWith('/items/')) {
        const id = parseInt(path.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            const index = database.findIndex(item => item.id === id);
            if (index !== -1) {
                database[index].name = updatedItem.name;
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Item Updated', item: database[index] }));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Item Not Found' }));
            }
        });
    }

    // DELETE - Delete data
    else if (method === 'DELETE' && path.startsWith('/items/')) {
        const id = parseInt(path.split('/')[2]);
        const index = database.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = database.splice(index, 1);
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Item Deleted', item: deletedItem[0] }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Item Not Found' }));
        }
    }

    // Invalid Route
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
