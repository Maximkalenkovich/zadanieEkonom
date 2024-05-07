const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


let data = { orders: [] };

if (fs.existsSync('data.json')) {
    const rawData = fs.readFileSync('data.json');
    data = JSON.parse(rawData.toString());
}

exports.createOrder = (req, res) => {
    const newOrder = {
        id: uuidv4(),
        ...req.body,
    };
    data.orders.push(newOrder);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return res.status(500).json({ message: 'Error creating order' });
        }
        console.log('Order created successfully');
        res.status(201).json(newOrder);
    });
};

exports.getAllOrders = (req, res) => {
    res.status(200).json(data.orders);
};
