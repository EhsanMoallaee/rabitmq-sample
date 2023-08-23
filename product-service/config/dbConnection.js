const { default: mongoose } = require('mongoose');

async function connectMongoDB() {
    const { DB_URL } = process.env;
    mongoose.connect( DB_URL )
        .then(() => {
            console.log("Product DB connected");
        })
        .catch((err) => {
            console.error("Product DB Not Connected : ", err);
        });
}

module.exports = {
    connectMongoDB
}