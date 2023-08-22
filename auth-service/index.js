const express = require('express');
const { authRouter } = require('./router/auth.routes');
require('dotenv').config();
const app = express();
const {PORT} = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);

app.use((req, res, next) => {
    return res.json({ error: 'NotFound'});
})
app.use((err, req, res, next) => {
    return res.json({ error: err.message});
})