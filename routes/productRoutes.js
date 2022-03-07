const express = require('express')
const router = express.Router()
const upload = require('../lib/multerConfig')
const controller = require('../controller/controllerClass')


// RUTAS------

router.get('/', async (req, res) => {
   const products = await controller.getAll()
   res.status(200).json(products)
})

router.get('/:id', async (req, res) => {
   const { id } = req.params
   const product = await controller.getById(Number(id))

   if (product.Error) return res.status(400).json(product)
   res.status(200).json(product)
})

router.post('/', upload.single('foto'), async (req, res) => {
   if (!req.file) return res.status(400).json({ error: 'debe subir una imagen' })


   const product = await controller.save(req.body)
   res.status(200).json({ newProduct: product, imagen: req.file })

})

router.put('/:id', async (req, res) => {
   const { ...body } = req.body
   const { id } = req.params
   const product = await controller.getById(Number(id))

   if (product.Error) return res.status(400).json(product)
   res.status(200).json({ ...product, ...body })


})

router.delete('/:id', async (req, res) => {
   const { id } = req.params
   const products = await controller.deleteById(Number(id))
   res.status(200).json(products)
})

module.exports = router