const express = require('express');
const { productRouter } = require('./router/product.routes');
require('dotenv').config();
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product', productRouter);

app.use((req, res, next) => {
    return res.json({ error: 'NotFound'});
})
app.use((err, req, res, next) => {
    return res.json({ error: err.message});
})