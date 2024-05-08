const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createOrder, getAllOrders } = require('../controllers/orderController');
let data = require('../data/data.json');
const config = require('config')
const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const fs = require('fs');

fs.readFile('../data/data.json', 'utf8', (err, jsonString) => {
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

const productController = require('../controllers/productController');
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/orders', createOrder);
app.get('/orders', getAllOrders);
module.exports = data;

