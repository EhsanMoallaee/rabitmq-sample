const { pushToQueue, createQueue } = require("../config/rabitmq");

async function isAuthenticated(req, res, next) {
    try {
        const token = req.headers?.['authorization']?.split(' ')[1];
        await pushToQueue('AUTH', {token});
        const channel = await createQueue('ISAUTH');
        channel.consume('ISAUTH', msg => {
            req.user = JSON.parse(msg.content.toString()).user;
            channel.ack(msg);
            next();
        })
    } catch (error) {
        console.log(error);
        next({message: 'Authentication failed'});
    }
}

module.exports = {
    isAuthenticated,
}