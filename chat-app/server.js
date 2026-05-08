const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Message = mongoose.model('Message', {
    name: String,
    message: String
})

// Obtener los mensajess
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find()
        res.send(messages)
    } catch (error) {
        res.sendStatus(500)
    }
})

// Guardar los mensajes
app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body)
        await message.save()

        io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

// Socket.io
io.on('connection', () => {
    console.log('Usuario conectado')
})

const server = http.listen(3000, () => {
    console.log('Servidor funcionando en puerto 3000')
})