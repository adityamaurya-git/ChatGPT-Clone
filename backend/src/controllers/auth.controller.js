const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// POST : REGISTER:-

const registerUser = async (req , res) =>{

    const {email , fullName:{firstName , lastName} , password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User Already Exists."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        fullName:{firstName , lastName},
        password:hashedPassword,
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET_KEY)

    res.cookie("token" , token);

    res.status(201).json({
        message:"User Register Successfully.",
        user:{
            email,
            fullName:{firstName , lastName}
        }
    })
}

// POST : LOGIN:-

const loginUser = async (req , res) =>{
    const {email , password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"Invalid Email."
        })
    }

    const decodePassword = await bcrypt.compare(password , user.password);

    if(!decodePassword){
        return res.status(400).json({
            message:"Invalid Email or Password."
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email
    },process.env.JWT_SECRET_KEY);

    res.cookie("token" , token);

    res.status(200).json({
        message:"User Logged In.",
        user:{
            email,
            fullName:user.fullName
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}