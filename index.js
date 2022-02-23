const contenedor = require('./contenedor')

const product = {
   title: 'tv',
   price: 1000,
   thumbnail: 'http://product.com/tv'
}


// -------guardar producto---------------
const saveProduct = (newProduct) => {
   contenedor.save(newProduct)
      .then(console.log)
      .catch(err => console.log(err))
}
// saveProduct(product)


// --------Buscar producto por ID---------
const searchById = (id) => {
   contenedor.getById(id)
      .then(console.log)
}
// searchById(3)



// -------obtener todos los productos--------
const getAllProd = () => {
   contenedor.getAll()
      .then(res => console.log(res))
      .catch(err => console.log(err))
}

// getAllProd()



// -----------Eliminar un producto--------
const removeProduct = (id) => {
   contenedor.deleteById(id)
      .then(console.log)
}

// removeProduct(4)


// -----------Eliminar todo el contenido del archivo-------

const removeAll = () => {
   contenedor.deleteAll()
      .then(console.log)
}

// removeAll()