import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const register = (req, res) => {
    res.send({
        status: "success",
        message: "User registered",
        payload: req.user._id
    });

}
const failedRegister = (req, res) => {
    res.send("failed Register");
}

const login = (req, res) => {
    const serializedUser = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email,
    };
    const token = jwt.sign(serializedUser, 'CoderSecret', {
            expiresIn: "1h"
        });
        res.cookie("coderCookie", token, {
            maxAge: 3600000
        })
        .send({
            status: "success",
            payload: serializedUser
        })

}
const failedLogin=(req,res)=>{
    res.send("failed Login");
}
const getCurrentUser =(req,res)=>{
    res.send(req.user)
}
export default {
    register,
    failedRegister,
    login,
    failedLogin,
    getCurrentUser
}