require('dotenv').config({quiet: true});
const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({error: "Internal server error"});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
