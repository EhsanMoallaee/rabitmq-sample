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

    return res.status(200).json({
        statusCode: 200,
        message: 'Product created successfully'
    })
}

module.exports = {
    createProduct,
    buyProduct
}