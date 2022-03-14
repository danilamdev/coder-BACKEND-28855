const express = require('express')
const controller = require('../controller/controllerClass')
const { engine } = require('express-handlebars')
const app = express()

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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
   const nuevoProducto = { ...producto, price: priceNumer }

   await controller.save(nuevoProducto)
   res.redirect('/productos')
})

app.listen('8080', () => {
   console.log('servidor iniciado en PUERTO 8080')
})
