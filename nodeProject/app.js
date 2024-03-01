import express from 'express';
import bodyParser from 'body-parser';
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="name"><input type="text" name="size"><button type="submit">Add Product</button></form>');
});


app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/'); 
});

app.listen(3000); 
