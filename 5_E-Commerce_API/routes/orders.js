const express = require('express');
const {readData, writeData} = require('../utils/fileDB');
const {authenticate} = require('../middleware/auth');

const router = express.Router();

router.get('/',authenticate, async (req, res) => {
    const orders = await readData('orders.json');

    const userId = req.user.id;

    const userOrders = orders.filter(o => o.userId === userId);

    res.json(userOrders);
});

router.post('/', authenticate, async(req, res) => {
    const { items } = req.body;
    if(!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({error: "Items must be a non-empty array"});
    }

    const products = await readData('products.json');
    let total = 0;

    const orderItem = [];
    const prod = [];
    const map = new Map();

    for(const item of items) {
        if(!Number.isInteger(item.quantity) || item.quantity <= 0) {
            return res.status(400).json({error: "Bad request"});
        }

        map.set(item.productId, (map.get(item.productId) ?? 0) + item.quantity);
    }

    for (const [productId, quantity] of map) {
        const product = products.find((p) => p.id === productId);

        if(!product) {
            return res.status(400).json("Not found");
        }
        if(product.stock < quantity) {
            return res.status(400).json({error: "Not enough stock for product"});
        }

        total += product.price * quantity;

        orderItem.push({
            productId,
            name: product.name,
            quantity: quantity,
            price: product.price
        });
        prod.push({product, quantity})
    }
    prod.forEach((item) => {
        item.product.stock -= item.quantity;
    })

    await writeData('products.json', products);

    const orders = await readData('orders.json');
    const orderIds = orders.map(o => o.id);
    const newOrder = {
        id: orders.length ? Math.max(...orderIds) + 1 : 1,
        userId: req.user.id,
        items: orderItem,
        total,
        createdAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    await writeData('orders.json', orders);

    res.status(201).json(newOrder);
});

router.get('/:id', authenticate, async (req, res) => {
    const orders = await readData('orders.json');

    const orderId = Number(req.params.id);

    const order = orders.find(o => o.id === orderId);

    if(!order) {
        return res.status(404).json({error:"Not found"});
    }

    if(order.userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({error: "Forbidden"})
    }

    res.json(order);
});

module.exports = router;