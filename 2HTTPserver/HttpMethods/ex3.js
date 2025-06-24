const http = require('http');
const url = require('url');

let database = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    switch (method) {
        case 'GET':
            if (pathname === '/items') {
                res.writeHead(200);
                res.end(JSON.stringify(database));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
            break;

        case 'POST':
            if (pathname === '/items') {
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
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
            break;

        case 'PUT':
            if (pathname.startsWith('/items/')) {
                const id = parseInt(pathname.split('/')[2]);
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
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
            break;

        case 'DELETE':
            if (pathname.startsWith('/items/')) {
                const id = parseInt(pathname.split('/')[2]);
                const index = database.findIndex(item => item.id === id);

                if (index !== -1) {
                    const deletedItem = database.splice(index, 1);

                    res.writeHead(200);
                    res.end(JSON.stringify({ message: 'Item Deleted', item: deletedItem[0] }));
                } else {
                    res.writeHead(404);
                    res.end(JSON.stringify({ message: 'Item Not Found' }));
                }
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Route not found' }));
            }
            break;

        default:
            res.writeHead(405);
            res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
});

server.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
