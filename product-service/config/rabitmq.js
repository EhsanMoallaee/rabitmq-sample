const amqp = require('amqplib');
let channel;

const connectToChannel = async() => {
    try {
        const AMQP_URL = process.env.AMQP_URL;
        const connection = await amqp.connect(AMQP_URL);
        return await connection.createChannel();
    } catch (error) {
        console.log('Product service failed to connect to rabitmq channel');
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
        await returnChannel();
        await channel.assertQueue(queueName);
        return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    connectToChannel,
    returnChannel,
    pushToQueue,
    createQueue
}