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

    res.cookie("token" , token,{
       httpOnly:true,
        secure:true,
        sameSite:'lax',
        path:'/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1 days
    });

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

    res.cookie("token" , token,{
        httpOnly:true,
        secure:true,
        sameSite:'lax',
        path:'/',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1 days
    });

    res.status(200).json({
        message:"User Logged In.",
        user:{
            email,
            fullName:user.fullName
        }
    })
}

// GET : LOGOUT:-

const logoutUser = async (req , res) =>{
    res.clearCookie("token");
    res.status(200).json({
        message:"User Logged Out Successfully."
    })
}

const currentUser = async (req, res) =>{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);

    const user = await userModel.findById(decoded.id).select('-password -__v');

    if(!user){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    res.status(200).json({
        message:"Current User Fetched Successfully.",
        user
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    currentUser
}