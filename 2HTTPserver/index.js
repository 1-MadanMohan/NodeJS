const HTTP = require('http');
const port = 3000;
const fs = require('fs');
const url = require('url');

const server = HTTP.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        return res.end();
    }

    const log = `${new Date().toISOString()} : ${req.url} New Request received\n`;
    const myURL = url.parse(req.url, true);
    console.log(myURL);

    // Log the request to a file
    fs.appendFile('log.txt', log, (err) => {

        if (err) {
            console.error('Error writing to log file', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }

        // Use myURL.pathname for proper routing (ignoring query string)
        switch (myURL.pathname) {
            case '/':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Welcome to the home page!');
                break;

            case '/about':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                const username = myURL.query.myname || 'Guest';
                res.end(`Hi! I am ${username}, this is the about page!`);
                break;

            case '/contact':
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('This is the contact page!');
                break;

            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Page not found!');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});






























// const HTTP = require('http');
// const port = 3000;
// const fs = require('fs');
// const url = require('url'); 


// const server = HTTP.createServer((req, res) => {
//     if(req.url === '/favicon.ico') {
//         return res.end();    
//     }
//     const log = `${new Date().toISOString()} :${req.url} New Request received\n`;
//     const myURL = url.parse(req.url, true);
//     console.log(myURL);

//     // Log the request to a file
//     fs.appendFile('log.txt', log, (err) => {
        
//         // if (err) {
//         //     console.error('Error writing to log file', err);
//         //     res.statusCode = 500;
//         //     res.end('Internal Server Error');
//         //     return;
//         // }

//         // res.end('Hello World\n');
//         // console.log('Log entry added');


//           switch(req.url) {
//         case '/':
//           res.writeHead(200, {'Content-Type': 'text/plain'});
//           res.end('Welcome to the home page!');
//           break;    
//         case '/about':
//           res.writeHead(200, {'Content-Type': 'text/plain'});
//           const username = myURL.query.myname;
//             res.end('HI! Iam`${username}, this is the about page!`');
//             break;
//         case '/contact':
//           res.writeHead(200, {'Content-Type': 'text/plain'});
//           res.end('This is the contact page!');
//             break;
//           }
//     });
// });

// server.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });
