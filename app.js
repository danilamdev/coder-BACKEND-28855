const express = require('express')
const app = express()
const contenedor = require('./contenedor')

app.get('/productos', (req, res) => {
   contenedor.getAll()
      .then(console.log)
})

app.get('/productosRandom', async (req, res) => {
   const products = await contenedor.getAll()
   const random = Math.floor(Math.random() * products.length + 1)

   const randomProd = await contenedor.getById(random)

   console.log(randomProd)
   res.send(`<h1>${random}</h1>`)
})

app.listen(8080, () => {
   console.log('app listen on port 8080')
})