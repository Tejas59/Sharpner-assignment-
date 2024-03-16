const express = require('express');
const ejs = require('ejs');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = 4000;


app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', postRoutes);
app.use('/', commentRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
