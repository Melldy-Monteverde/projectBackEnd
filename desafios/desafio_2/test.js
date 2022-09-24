const Container = require('./container');

const products = new Container('./products.txt')

const test = async () => {
  const data = await products.getAll()
  console.log(data);
}

test()