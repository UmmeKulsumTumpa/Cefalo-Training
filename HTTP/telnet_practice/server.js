const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
