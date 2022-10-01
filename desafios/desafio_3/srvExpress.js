const express = require('express');
const Container = require('./container');
const product = new Container('./products.txt');

const app = express();

app.get('/', (req, res) => {
	res.send(`<h1 style= "color:#000">Hi, it's Melldy</h1>`);
});

app.get('/products', async (req, res) => {
	const getProductos = await product.getAll();
	res.send(getProductos);
});

app.get('/productRandom', async (req, res) => {
	const getProduct = await product.getAll();
	const productRandom =
		getProduct[Math.floor(Math.random() * getProduct.length)];
	res.send(productRandom);
});

app.listen(8080, () => {
	console.log(
		'server listening in port 8080'
	);
});

// https://glitch.com/edit/#!/superb-vivid-cobra?path=server.js%3A3%3A41