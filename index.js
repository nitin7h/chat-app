const express = require("express")
const http = require("http")
const fs = require("fs")
const path = require("path")


const { Server } = require('socket.io');
const { log } = require("console");


const PORT = 8000
const app = express()

//server
const server = http.createServer(app)
const io = new Server(server); // connecting local server to io Server

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('user-message', (data) => {
        console.log(data);
        io.emit("message", data)
    })
});







// app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve("./public")))


app.get("/", (req, res) => {
    return res.sendFile(__dirname + './public/index.html')
})










server.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})