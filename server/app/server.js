const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const fs = require('fs');

let data;

fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }
    try {
        data = JSON.parse(jsonString);
        console.log('Data parsed successfully');
    } catch (err) {
        console.log('Error parsing JSON string:', err);
    }
});
