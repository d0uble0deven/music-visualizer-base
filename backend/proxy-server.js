const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '../')));

// Proxy endpoint to bypass CORS restrictions
app.get('/proxy', (req, res) => {
    const url = req.query.url;
    request(url).pipe(res);
});

// Start the server on port 3000
app.listen(3001, () => {
    console.log('Proxy server is running on port 3001');
});
