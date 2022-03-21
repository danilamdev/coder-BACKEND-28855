const fs = require('fs')
const path = require('path')

class Controller {
   constructor(fileName) {
      this.fileName = fileName
   }

   async save(newProduct) {
      try {
         const file = JSON.parse(await fs.promises.readFile(this.fileName))
         const ids = file.map(f => f.id)
         const newID = Math.max(...ids) + 1

         newProduct = { id: newID, ...newProduct }
         file.push(newProduct)

         await fs.promises.writeFile(this.fileName, JSON.stringify(file, null, 2))

         return newID

      } catch (error) {
         return Promise.reject({ Error: 'hubo un error al leer el archivo...' })
      }
   }

   async getById(id) {
      const file = JSON.parse(await fs.promises.readFile(this.fileName))
      const fileById = await file.find(f => f.id === id)

      if (typeof fileById === 'undefined') return { Error: 'producto no encontrado' }

      return fileById
   }

   async getAll() {
      try {
         const products = JSON.parse(await fs.promises.readFile(this.fileName))
         return products

      } catch (error) {
         return []
      }
   }

   async deleteById(id) {
      const file = JSON.parse(await fs.promises.readFile(this.fileName))
      const newFile = file.filter(f => f.id !== id)
      await fs.promises.writeFile(this.fileName, JSON.stringify(newFile, null, 2))

      return `producto con id ${id} eliminado`

   }

   async deleteAll() {
      await fs.promises.writeFile(this.fileName, '')
      return 'eliminado todo el contenido'
   }
}


module.exports = new Controller(path.resolve(__dirname, '../products.json'))

