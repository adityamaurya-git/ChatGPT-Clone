require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket.server');
const httpServer = require('http').createServer(app);

// DATABASE CONNECTION CALLING:-
connectDB();
initSocketServer(httpServer);


// SOCKET IO:-



httpServer.listen(3000 , ()=>{
    console.log("server is running on port 3000");
})