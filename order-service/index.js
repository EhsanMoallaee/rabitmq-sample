const express = require('express');
const { orderRouter } = require('./router/order.routes');
const { connectMongoDB } = require('../order-service/config/dbConnection');
require('dotenv').config();
const app = express();
const {PORT} = process.env;

connectMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/order', orderRouter);

app.use((req, res, next) => {
    return res.json({ error: 'NotFound'});
})
app.use((err, req, res, next) => {
    return res.json({ error: err.message});
})

app.listen(PORT, () => {
    console.log(`Order service is running on : http://localhost:${PORT}`);
})