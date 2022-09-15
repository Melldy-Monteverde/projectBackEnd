class User {
  constructor(name, lastname, pets, books) {
    this.name = name;
    this.lastname = lastname;
    this.pets = pets;
    this.books = books;
  }
  getFullName() {
    return `${this.name} ${this.lastname}`;
  }
  addPet(pet) {
    this.pets.push(pet);
  }
  countPets() {
    return this.pets.length;
  }
  addBook(name, author) {
    this.books.push({
      name: name,
      author: author,
    });
  }
  getBookNames() {
    console.log('Libros leidos: ');
    return this.books.map((book) => book.name);
  }
}

let user = new User(
  'Melldy',
  'Monteverde',
  [],
  [{ name: 'La divina comedia', author: 'Dante Alighieri' }]
);

user.addPet('Chanler');
user.addBook('Confesiones de un chef', 'Anthony Bourdain');
console.log('Usuario:', user.getFullName());
console.log('Tengo: ' + user.countPets() + ' gato');

user.getBookNames().forEach((book) => {
  console.log(book);
});