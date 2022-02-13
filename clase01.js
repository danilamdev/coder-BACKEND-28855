class Usuario {
   constructor(nombre, apellido, libros, mascotas) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.libros = libros;
      this.mascotas = mascotas;
   }

   getFullName() {
      return `el nombre del usuario es ${this.nombre} ${this.apellido}`
   }

   addMascota(nombreMascota) {
      this.mascotas.push(nombreMascota)
   }

   countMascotas() {
      return this.mascotas.length
   }

   addBook(nombre, autor) {
      this.libros.push({ nombre, autor })
   }

   getBookNames() {
      return this.libros.map(libro => libro.nombre)
   }
}

const libros = [
   {
      nombre: 'el señor de los anillos',
      autor: 'tolken'
   },
   {
      nombre: '100 años de soledad',
      autor: 'garcia marquez'
   }
]

const mascotas = ['perro', 'gato', 'pez']


// creacion de la instancia usuario

const usuario = new Usuario('daniel', 'lambarri', libros, mascotas)



// usuario completo

console.log(usuario)



// metodos para agregar libro y mascotas

usuario.addBook('el resplandor', 'stephen king')
usuario.addMascota('loro')


// metodo para bookName, FullName y contador de mascotas

console.log(`usted tiene ${usuario.countMascotas()} mascotas`)
console.log(`los libros preferidos son ${usuario.getBookNames().join(', ')}`)
console.log(usuario.getFullName())
