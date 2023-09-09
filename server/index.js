import express from "express";
import http from 'http'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server as SocketServer } from "socket.io";

const app = express()
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection',socket =>{
    console.log(socket.id)

    socket.on('message', (body)=>{
        socket.broadcast.emit('message',{
            body,
            from: socket.id.slice(6)
        })
    })
})

app.use(express.static(join(__dirname,'../client/build')))

server.listen(port)
console.log("Server on port",port)
