const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


let data = { orders: [] };

if (fs.existsSync('dataOrder.json')) {
    const rawData = fs.readFileSync('data.json');
    data = JSON.parse(rawData.toString());
}

exports.createOrder = (req, res) => {
    const { productId, ...orderDetails } = req.body;

    const newOrder = {
        id: uuidv4(),
        productId,
        ...orderDetails,
    };
    data.orders.push(newOrder);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return res.status(500).json({ message: 'Error creating order' });
        }
        console.log('Order created successfully');
        res.status(201).json(newOrder);
        res.redirect('/products');
    });
};

exports.getAllOrders = (req, res) => {
    res.status(200).json(data.orders);
};
