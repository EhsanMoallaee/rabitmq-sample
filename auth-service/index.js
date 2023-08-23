const express = require('express');
const { authRouter } = require('./router/auth.routes');
const { connectMongoDB } = require('./config/dbConnection');
require('dotenv').config();
const app = express();
const {PORT} = process.env;

connectMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);


app.use((req, res, next) => {
    return res.json({ error: 'NotFound'});
})
app.use((err, req, res, next) => {
    return res.json({ error: err.message});
})

app.listen(PORT, () => {
    console.log(`Auth service is running on : http://localhost:${PORT}`);
})