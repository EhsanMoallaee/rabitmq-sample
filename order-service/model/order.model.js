const { default: mongoose } = require('mongoose');

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    products: [
        { _id: {type: String} }
    ],
    totalPrice: {type: Number }
}, { timestamps: true})

const OrderModel = mongoose.model("order", orderSchema);

module.exports = {
    OrderModel
}