const amqp = require('amqplib');
const { OrderModel } = require('../model/order.model');
const { calculateTotalPrice } = require('../functions/calculate.totalPrice');
let channel;

const connectToChannel = async() => {
    try {
        const AMQP_URL = process.env.AMQP_URL;
        const connection = await amqp.connect(AMQP_URL);
        return await connection.createChannel();
    } catch (error) {
        console.log('Order service failed to connect to rabitmq channel');
    }
}

const returnChannel = async() => {
    if(!channel) {
        channel = await connectToChannel();
    }
    return channel;
}

const createQueue = async(queueName) => {
    const channel = await returnChannel();
    await channel.assertQueue(queueName);
    return channel;
}

const pushToQueue = async(queueName, data) => {
    try {
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error.message);
    }
}

const createOrderWithQueue = async(queueName) => {
    await createQueue(queueName);
    channel.consume(queueName, async msg => {
        if(msg.content) {
            const { products, userEmail } = JSON.parse(msg.content.toString());
            const totalPrice = await calculateTotalPrice(products);
            const newOrder = await OrderModel.create({ userEmail, products, totalPrice });
            channel.ack(msg);
            pushToQueue("PRODUCT", newOrder);
            console.log('Order created successfully');
        }
    })
}

module.exports = {
    connectToChannel,
    returnChannel,
    pushToQueue,
    createOrderWithQueue,
    createQueue
}