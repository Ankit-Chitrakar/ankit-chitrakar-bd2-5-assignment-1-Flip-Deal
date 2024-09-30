const express = require('express');
const { resolve } = require('path');
const products = require('./product.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// sort desc according to rating of products
const sortedProductsByRating = (product1, product2) => {
  return product2.rating - product1.rating;
};

// sort desc according to price of products
const sortedProductsByPriceDesc = (product1, product2) => {
  return product2.price - product1.price;
};

// sort asc according to price of products
const sortedProductsByPrice = (product1, product2) => {
  return product1.price - product2.price;
};

// sort asc according the price
const sortPrice = (product1, product2) => {
  return product1.price - product2.price;
};

// Endpoint 1: Get the products sorted by popularity
app.get('/products/sort/popularity', (req, res) => {
  let productsCopy = products.slice();

  let sort_product = productsCopy.sort(sortedProductsByRating);
  res.json({ products: sort_product });
});

// Endpoint 2: Get the products sorted by “high-to-low” price
app.get('/products/sort/price-high-to-low', (req, res) => {
  let productsCopy = products.slice();

  let sort_product = productsCopy.sort(sortedProductsByPriceDesc);
  res.json({ products: sort_product });
});

// Endpoint 3: Get the products sorted by “low-to-high” price
app.get('/products/sort/price-low-to-high', (req, res) => {
  let productsCopy = products.slice();

  let sort_product = productsCopy.sort(sortedProductsByPrice);
  res.json({ products: sort_product });
});

// Endpoint 4: Filter the products based on the “RAM” option.
app.get('/products/filter/ram', (req, res) => {
  let ram = parseInt(req.query.ram);
  let filter_products_ram = products.filter((product) => product.ram === ram);

  res.json({ products: filter_products_ram });
});

// Endpoint 5: Filter the products based on the “ROM” option.
app.get('/products/filter/rom', (req, res) => {
  let rom = parseInt(req.query.rom);
  let filter_products_rom = products.filter((product) => product.rom === rom);

  res.json({ products: filter_products_rom });
});

// Endpoint 6: Filter the products based on the “Brand” option.
app.get('/products/filter/brand', (req, res) => {
  let brand = req.query.brand;
  brand = brand.toLowerCase();

  let filter_products_brand = products.filter(
    (product) => product.brand.toLocaleLowerCase() === brand
  );

  res.json({ products: filter_products_brand });
});

// Endpoint 7: Filter the products based on the “OS” option.
app.get('/products/filter/os', (req, res) => {
  let os = req.query.os;
  os = os.toLowerCase();

  let filter_products_os = products.filter(
    (product) => product.os.toLocaleLowerCase() === os
  );

  res.json({ products: filter_products_os });
});

// Endpoint 8: Filter the products based on the “Price” option.

app.get('/products/filter/price', (req, res) => {
  let price = parseFloat(req.query.price);

  let filter_products_price = products.filter(
    (product) => product.price <= price
  );

  // i make a additional sort asc to the price filter
  let productCopy = filter_products_price.slice();

  let sort_filter_products_price = productCopy.sort(sortPrice);

  res.json({ products: sort_filter_products_price });
});

// Endpoint 9: Send original array of products
app.get('/products', (req, res) => {
  res.json({ products: products });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
