const express = require('express')
const productRoutes = require('./routes/productRoutes')
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', productRoutes)


app.get('/', (req, res) => {
   res.sendFile('index')
})


app.listen(8080, () => {
   console.log('app listen on port 8080')
})