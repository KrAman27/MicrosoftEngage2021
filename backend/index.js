//Importing frameworks and dependencies
const app = require("express")(); //Requiring express js
const server = require("http").createServer(app); // Creating server
const cors = require("cors"); //Requiring CORS : Connect/Express

// making use of server from anywhere
const io = require("socket.io")(server, {
    cors: {
        origin : "*",
        methods: ["GET", "POST"]
    }
});

//Connecting with Express
app.use(cors());

//Port for Backend/Express Server
const PORT = process.env.PORT || 5000;

//Home Route
app.get("/", (req,res) => {
    res.send("Server is running. ");
});

//On Building Connection by Socket.io
io.on("connection", (socket) => {
    //Sending my ID
    socket.emit("me", socket.id);

    //On Disconnecting
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    //To send message to the other user/other client : Emitting message to other client
    socket.on("msgUser", ({ name, to, msg, sender }) => {
        io.to(to).emit("msgRcv", { name, msg, sender });
    });

    //On calling another user : Calling other client
    socket.on("callUser", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("callUser", {signal: signalData, from, name});
    });

    //On answering Call : Answering the call from other user/peer
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });
});

//Server is Listening on specified PORT No.
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));