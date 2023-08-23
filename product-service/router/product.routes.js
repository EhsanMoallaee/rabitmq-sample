const { Router } = require('express');
const { createProduct, buyProduct } = require('../controller/product.controller');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const productRouter = Router();

productRouter.post('/create', createProduct);
productRouter.post('/buy', isAuthenticated, buyProduct);

module.exports = {
    productRouter
}