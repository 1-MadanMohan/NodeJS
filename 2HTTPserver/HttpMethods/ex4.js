const http = require('http');
const url = require('url');

let database = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    switch (pathname) {

        case '/items':
            if (req.method === 'GET') {
                res.writeHead(200);
                res.end(JSON.stringify(database));
            } 
            else if (req.method === 'POST') {
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
            else {
                res.writeHead(405);
                res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            }
            break;

        case '/items/update':
            if (req.method === 'PUT') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const updatedItem = JSON.parse(body);
                    const id = updatedItem.id;
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
            else {
                res.writeHead(405);
                res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            }
            break;

        case '/items/delete':
            if (req.method === 'DELETE') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    const deleteRequest = JSON.parse(body);
                    const id = deleteRequest.id;
                    const index = database.findIndex(item => item.id === id);

                    if (index !== -1) {
                        const deletedItem = database.splice(index, 1);

                        res.writeHead(200);
                        res.end(JSON.stringify({ message: 'Item Deleted', item: deletedItem[0] }));
                    } else {
                        res.writeHead(404);
                        res.end(JSON.stringify({ message: 'Item Not Found' }));
                    }
                });
            } 
            else {
                res.writeHead(405);
                res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            }
            break;

        default:
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
});
