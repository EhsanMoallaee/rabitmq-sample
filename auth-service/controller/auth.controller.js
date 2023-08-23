const { comparePassword } = require("../functions/comparePassword");
const { hashPassword } = require("../functions/hashPassword");
const { signToken } = require("../functions/signToken");
const { UserModel } = require("../model/user.model");

async function register(req, res, next) {
    try {
        const { fullname, email, password } = req.body;
        const existUser = await UserModel.findOne({email});
        if(existUser) throw {message: 'Email already exist'};
        const hashedPassword = hashPassword(password);
        const user = await UserModel.create({fullname, email, hashedPassword});
        return res.status(201).json({
            statusCode: 201,
            message: 'User created successfully'
        })
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const existUser = await UserModel.findOne({email});
        if(!existUser) throw {message: 'User not found'};
        const result = await comparePassword(existUser.password, password);
        if(!result) throw {message: 'Login failed'};
        const payload = {userId: existUser._id, email: existUser.email}
        const token = await signToken(payload);
        return res.status(200).json({
            statusCode: 200,
            data: {
                token
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
}