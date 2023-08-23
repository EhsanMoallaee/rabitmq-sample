const { pushToQueue, createQueue } = require("../config/rabitmq");
const { ProductModel } = require("../model/product.model");

async function createProduct(req, res, next) {
    const { name, description, price } = req.body;
    const newProduct = await ProductModel.create({ name, description, price });
    if(!newProduct) throw { message: 'Product creation failed'}
    return res.status(201).json({
        statusCode: 201,
        message: 'Product created successfully'
    })
}

async function buyProduct(req, res, next) {
    const { productIDs = [] } = req.body;
    const products = await ProductModel.find({ _id: {$in: productIDs} });
    const {email} = req.user;
    await pushToQueue('ORDER', {products, userEmail: email});
    const channel = await createQueue('PRODUCT');
    await channel.consume('PRODUCT', msg => {
        console.log('Order created successfully');
        channel.ack(msg);
    })
    return res.json({
        statusCode: 201,
        message: 'Order created successfully'
    })
}

module.exports = {
    createProduct,
    buyProduct
}