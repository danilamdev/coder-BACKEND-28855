const express = require('express')
const controller = require('../controller/controllerClass')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
   res.render('pages/index')
})

app.get('/productos', async (req, res) => {
   const products = await controller.getAll()
   res.render('pages/table', { products })
})

app.post('/productos', async (req, res) => {
   const producto = req.body
   const priceNumber = Number(producto.price)
   const nuevoProducto = { ...producto, price: priceNumber }

   await controller.save(nuevoProducto)
   res.redirect('/productos')
})

app.listen('8080', () => {
   console.log('servidor iniciado en PUERTO 8080-- ejercicio ejs')
})