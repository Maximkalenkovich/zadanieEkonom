
const data = require('../data/data.json');


const getAllProducts = (req, res) => {
    res.status(200).json(data.products);
};

const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
};

module.exports = {
    getAllProducts,
    getProductById,
};
