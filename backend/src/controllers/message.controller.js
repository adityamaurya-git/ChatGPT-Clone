const messageModel = require('../models/message.model')

const getMessages = async (req , res) =>{

    const chatId = req.params.chatId;

    const messages = await messageModel.find({chat : chatId})

    if(!messages){
        return res.status(401).json({
            message:"No Messages."
        })
    }

    res.status(200).json({
        message:"Fetched Messages.",
        messages
    })
}

module.exports = {
    getMessages,
}