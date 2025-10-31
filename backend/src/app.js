const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

// ROUTERS:- 

const authRoutes = require('./routes/auth.routes')
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require("./routes/message.routes")



const app = express();

// MIDDLEWARES:-
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


const corsOptions = {
    origin: 'http://localhost:5173', // IMPORTANT: Use your frontend's actual URL
    credentials: true, // This is the crucial line that allows cookies
};

app.use(cors(corsOptions));

// ROUTES SETUP:-
app.use('/api/auth' , authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages' , messageRoutes);


app.get('*' , (req ,res)=>{
    res.sendFile(path.join(__dirname,  '../public/index.html'));
})
module.exports = app;