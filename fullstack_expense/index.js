const express = require('express');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signupRoutes');
const sequelize = require('./config/database');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', signupRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync()
  .then(() => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch(err => console.error('Error syncing database:', err));
