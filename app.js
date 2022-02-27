const express = require('express')
const app = express()
const contenedor = require('./contenedor')

app.get('/', (req, res) => {
   res.send(`
   <div>
      <h3/><a href="/productos">ir a productos</a></h3>
    </div>
    <div>
      <h3/><a href="/productosRandom">ir a productos Random</a></h3>
    </div>
    `)
})

app.get('/productos', (req, res) => {
   contenedor.getAll()
      .then(data => res.send(`<pre>${JSON.stringify(data)}</pre>`))
})

app.get('/productosRandom', async (req, res) => {
   const products = await contenedor.getAll()
   const random = Math.floor(Math.random() * products.length + 1)

   const randomProd = await contenedor.getById(random)

   res.send(`<pre>${JSON.stringify(randomProd)}</pre>`)
})

app.listen(8080, () => {
   console.log('app listen on port 8080')
})