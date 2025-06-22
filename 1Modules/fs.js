const fs = require('fs')

// Synchronous file operations
fs.writeFileSync("./Random.txt", 'This is a test file created by fs.writeFileSync()');
fs.writeFileSync('./Random2.txt', 'This is another test file created by fs.writeFileSync()');

// fs.writeFileSync("./Random.txt", 'This is a test file created by fs.writeFileSynccccc()');// Overrides

//Asynchronous file operations
fs.writeFile('./RandomAsync.txt', 'This is a test file created by fs.writeFile()', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});


const result  = fs.readFileSync('./Readingfile.txt', 'utf-8')
console.log(result);

fs.readFile('./Readingfile.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});


//To append to a file
fs.appendFileSync('./Random.txt', '\nThis is appended text using fs.appendFileSync()');
fs.appendFile('./RandomAsync.txt', '\nThis is appended text using fs.appendFile()', (err) => {
    if (err) throw err;
    console.log('The file has been updated with appended text!');
});
