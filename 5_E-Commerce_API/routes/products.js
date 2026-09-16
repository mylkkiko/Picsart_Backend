const express = require('express');
const {readData, writeData} = require('../utils/fileDB');
const {authenticate, authorize } = require('../middleware/auth');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    let products = await readData('products.json');

    const { category, sort } = req.query;
    if(category) products = products.filter((p) => p.category === category);
    if(sort === 'price') products = products.sort((a, b) => a.price - b.price);

    res.json(products);
});

productsRouter.get('/:id', async (req, res) => {
    const products = await readData('products.json');

    const productId = Number(req.params.id);

    const product = products.find((p) => p.id === productId);

    if(!product) return res.status(404).json({error: "Product not found"});

    res.json(product);
});

productsRouter.post('/', authenticate, authorize('admin'), async (req, res) => {
    const {name, price, category, stock} = req.body;
    if(!name || price === undefined) {
        return res.status(400).json({error: "Name and price are required"});
    }

    if(!Number.isFinite(price) || price < 0 || (stock !== undefined && (stock < 0 || !Number.isInteger(stock))) ) {
        return res.status(400).json({error: "Price and stock should be positive number"});
    }

    const products = await readData('products.json');
    const productsIds = products.map(p => p.id);

    const newProduct = {
        id: products.length ? Math.max(...productsIds) + 1 : 1,
        name, 
        price,
        category: category || 'other',
        stock: stock ?? 0
    }

    products.push(newProduct);
    await writeData('products.json', products);

    res.status(201).json(newProduct);
});

productsRouter.put('/:id', authenticate, authorize('admin'), async (req, res) => {
    const {name, price, category, stock} = req.body;

    if(!Number.isFinite(price) || price < 0 || (stock !== undefined && (stock < 0 || !Number.isInteger(stock))) ) {
        return res.status(400).json({error: "Price and stock should be positive number"});
    }
    
    if(!name || price === undefined || !category || stock === undefined) {
        return res.status(400).json({error: "all fields are required"})
    }
    const products = await readData('products.json');

    const productId = Number(req.params.id);

    const product = products.find((p) => p.id === productId);
    if(!product) {
        return res.status(404).json({error: "Not found"});
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;

    await writeData('products.json', products);

    res.status(200).json(product);
});

productsRouter.delete('/:id', authenticate, authorize("admin"), async (req, res) => {
    const productId = Number(req.params.id);

    const products = await readData('products.json');

    const index = products.findIndex(p => p.id === productId);

    if(index === -1) {
        return res.status(404).json({error: "Not found"});
    }

    products.splice(index, 1);

    await writeData('products.json', products);
    res.status(204).end();
})

module.exports = productsRouter;