const express = require('express');
const { productRouter } = require('./router/product.routes');
const { connectMongoDB } = require('../product-service/config/dbConnection');
require('dotenv').config();
const app = express();
const { PORT } = process.env;

connectMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product', productRouter);

app.use((req, res, next) => {
    return res.json({ error: 'NotFound'});
})
app.use((err, req, res, next) => {
    return res.json({ error: err.message});
})

app.listen(PORT, () => {
    console.log(`Product service is running on : http://localhost:${PORT}`);
})