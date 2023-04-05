const fs = require('fs');

fs.appendFile('ishan3.txt', ' Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more.', 'utf-8',
    (err) => {
        if (err)
            console.log('unable to write anything to file');
    });