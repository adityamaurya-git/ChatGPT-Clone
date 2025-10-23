const chatModel = require('../models/chat.model');


// POST 

const createChat = async (req , res) =>{

    const {title} = req.body;
    const user = req.user;

    const chat = await chatModel.create({
        user : user._id,
        title,
    })

    res.status(201).json({
        message:"Chat Created Successfully.",
        chat
    })
}

const getChat = async (req, res) =>{
    const user = req.user;

    const chats = await chatModel.find({user :user._id})

    if(!chats){
        return res.status(401).json({
            message:"No Chats."
        })
    }

    res.status(200).json({
        message:"Fetched Chats.",
        chats
    })
}



    module.exports = {
        createChat,
        getChat,
    }