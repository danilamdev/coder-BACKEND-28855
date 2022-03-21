const express = require('express')
const controller = require('./controller/controllerClass')
const { Server } = require('socket.io')
const http = require('http')
const { engine } = require('express-handlebars')

const app = express()
const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

io.on('connection', async (socket) => {
   console.log('** USUARIO CONECTADO **')
   const product = await controller.getAll()
   socket.on('disconnect', () => {
      console.log('Usuario DESCONECTO')
   })
   socket.on('chat', data => {
      io.sockets.emit('dataBACK', data)
   })

   socket.on('form', data => {
      io.sockets.emit('formBACK', data)
   })

   socket.emit('initial', product)
})

app.get('/', async (req, res) => {
   const products = await controller.getAll()
   res.render('home', { products })
})

app.get('/productos', async (req, res) => {
   const products = await controller.getAll()
   res.render('table', { products })
})

app.post('/productos', async (req, res) => {
   const producto = req.body
   const priceNumber = Number(producto.price)
   const nuevoProducto = { ...producto, price: priceNumber }

   await controller.save(nuevoProducto)
   res.json(nuevoProducto)
   // res.redirect('/productos')
   // res.redirect('/')
})

const PORT = 8080
serverHttp.listen(PORT, () => {
   console.log('servidor iniciado en PUERTO 8080-- ejercicio handlebar')
})
serverHttp.on('error', err => console.log(err))