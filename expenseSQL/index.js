const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const expenseRoutes = require('./routes/expenseRoutes');
const sequelize = require('./config/database');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', expenseRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => console.error('Error syncing database:', err));
