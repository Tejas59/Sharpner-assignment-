const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(productsFilePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(productsFilePath, JSON.stringify(products), err => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
