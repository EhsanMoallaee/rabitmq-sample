const amqp = require('amqplib');
const { checkAuth } = require('../functions/checkAuth');
let channel;

const connectToChannel = async() => {
    try {
        const AMQP_URL = process.env.AMQP_URL;
        const connection = await amqp.connect(AMQP_URL);
        return await connection.createChannel();
    } catch (error) {
        console.log('Auth service failed to connect to rabitmq channel');
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

const isAuthenticatedRabitMSG = async(queueName) => {
    await createQueue(queueName);
    channel.consume(queueName, async msg => {
        if(msg.content) {
            const { token } = JSON.parse(msg.content.toString());
            if(token) {
                const result = await checkAuth(token);
                pushToQueue("ISAUTH", result);
            }
        }
        channel.ack(msg);
    })
}

module.exports = {
    connectToChannel,
    returnChannel,
    pushToQueue,
    isAuthenticatedRabitMSG
}