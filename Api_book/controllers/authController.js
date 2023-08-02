const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const authController = {
    //register
    registerUser: async(req,res)=>{
        try {
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            //tao new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });
            // save user to db
            const user =  await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.msg);
        }
    },
    //generate accesstoken
    generateAccessToken: (user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },  
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "300h" }
        );
    },
    generateRefreshToken: (user)=>{
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },  
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "300d" }
        );
    },
    //login
    loginUser: async(req,res) => {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user){
                res.status(404).json("wrong email");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword){
                res.status(404).json("wrong password");
            }
            if (user && validPassword){
               const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                const {password, ...others} = user._doc;// loại bỏ password khi trả về kết quả
                res.status(200).json({others, accessToken, refreshToken});
            }
        } catch (err) {
        res.status(500).json(err.msg)            
        }
    }
}

module.exports = authController;