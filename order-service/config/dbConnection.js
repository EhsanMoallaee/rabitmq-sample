const { default: mongoose } = require('mongoose');

async function connectMongoDB() {
    const { DB_URL } = process.env;
    mongoose.connect( DB_URL )
        .then(() => {
            console.log("Order DB connected");
        })
        .catch((err) => {
            console.error("Order DB Not Connected : ", err);
        });
}

module.exports = {
    connectMongoDB
}