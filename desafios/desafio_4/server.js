const express = require('express');
const { productsRoute } = require('./routes/products');
const app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
	console.log(`tu servidor: http://localhost:${server.address().port}`);
});

app.use('/api/products', productsRoute);
// app.use('/api/products/id', productsRoute);

