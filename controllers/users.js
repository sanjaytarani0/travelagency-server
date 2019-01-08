const jwt = require('jsonwebtoken');
const User = require('../models/user')
const {JWT_SECRET} = require('../configuration/index')

signToken = user =>{
    return jwt.sign({
        iss:'Sanjay',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
    },JWT_SECRET);
} 
module.exports = {
    signUp : async (req,res,next) => {
        const {email,password} = req.value.body;
        
        //Check if user exists
        const foundUser = await User.findOne({email});
        if(foundUser){
            res.status(403).json({error:'User already exists'})
        }

        //Create a new user
        
        const newUser = new User({email,password});
        await newUser.save();
        
        const token = signToken(newUser);
        //respond with token
        res.status(200).json({token: token}); 
    },

   
    signIn : async (req,res,next) => {
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    secret : async (req,res,next) => {
        res.json({secret:"resource"});
    }
}