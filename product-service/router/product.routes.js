const { Router } = require('express');
const { createProduct } = require('../controller/product.controoler');
const productRouter = Router();

productRouter.post('/create', createProduct);

module.exports = {
    productRouter
}