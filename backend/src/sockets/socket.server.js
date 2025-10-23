const { Server } = require("socket.io");
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const aiService = require('../services/ai.service')
const messageModel = require('../models/message.model');
const { createMemory, queryMemory } = require('../services/vector.service');
const { default: mongoose } = require("mongoose");

const initSocketServer = (httpServer) => {

    const io = new Server(httpServer, {
        cors:{
            origin:"http://localhost:5173",
            allowedHeaders:['Authorization','Content-Type'],
            credentials:true
        }
    });

    io.use(async (socket, next) => {
        const cookies = cookie.parse(socket.handshake.headers?.cookie || '');

        if (!cookies.token) {
            next(new Error("Authentication error: No Token Provided"));
        }

        try {
            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY);
            const user = await userModel.findById(decoded.id);
            socket.user = user;
            next();
        } catch (err) {
            next(new Error("Authentication Error: Invalid Token"));
        }
    })

    io.on("connection", (socket) => {

        socket.on("ai-message", async (data) => {
            try {

                // OPTIMIZED CODE FOR PROCESS 1 & 2.
                const [message , vectors] = await Promise.all([
                    // 1) STORING USER MESSAGE IN DB.
                    messageModel.create({
                    user: socket.user._id,
                    chat: data.chat,
                    content: data.content,
                    role: "user"
                    }),

                    // 2) CONVERTING USER MESSAGE INTO VECTORS.
                    aiService.generateVector(data.content)
                ])


                // PROCESS 3.
                 // 3) STORING USER CONVERTED VECTOR IN PINECONE DB.
                await createMemory({
                    vectors,
                    messageId:message._id,
                    metadata:{
                        chat: data.chat,
                        user: socket.user._id,
                        role:"user",
                        content:data.content
                    }
                });


                // OPTIMIZED CODE FOR PROCESS 4 & 5.

                const [memory , chatHistory ] = await Promise.all([
                   
                    // 4) SEARCHING MESSAGES IN PINECONE DB.
                    queryMemory({
                        queryVector: vectors,
                        limit:3,
                        metadata:{
                            user: socket.user._id
                        }
                    }),

                    // 5) FINDING USER CHAT HISTORY IN DB.
                    messageModel.find({ chat: data.chat })

                ])


                const stm = chatHistory.map((item) => {
                    return {
                        role: item.role,
                        parts: [{ text: item.content }]
                    }
                })

                const ltm = [
                    {
                        role:"user",
                        parts:[{
                            text:`there are some messages from thr chat , use them to generate a response : ${memory.map((item)=>{
                                return item.metadata.content
                            } )}`
                        }]
                    }
                ]


                // PROCESS 6
                // GETTING RESPONSE FROM AI AFTER SENDING LTM & STM.
                const response = await aiService.generateResponse([...ltm , ...stm]); 


                // PROCESS 7
                // SENDING THE RESPONSE TO THE USER FROM AI.
                socket.emit("ai-response", {
                    content: response,
                    chat: data.chat,
                })

                // OPTIMIZED CODE FOR PROCESS 8 & 9
                const [responseMessage , responseVectors] = await Promise.all([

                    // 8) STORING THE RESPONSE OF AI IN DB.
                    messageModel.create({
                        user: socket.user._id,
                        chat: data.chat,
                        content: response,
                        role: "model"
                    }),

                    // 9) CONVERTING THE RESPONSE OF AI INTO VECTOR.
                    aiService.generateVector(response)
                ])

                // 10) STORING THE CONVERTED VECTOR IN PINECONE DB.
                await createMemory({
                    vectors:responseVectors,
                    messageId:responseMessage._id,
                    metadata:{
                        chat: data.chat,
                        user: socket.user._id,
                        role:"model",
                        content:response
                    }
                })

                

            } catch (error) {
                console.error("!!! FATAL ERROR in 'ai-message' handler:");
                console.dir(error, { depth: null }); // .dir shows the full object

                socket.emit("ai-error", {
                    message: "An error occurred processing your request.",
                    // Send the specific error message to the client
                    error: error.message || "Unknown error" 
                });
            }
        })

    })

}

module.exports = initSocketServer;