const express = require('express');
const bodyParser = require('body-parser');
const signupRoutes = require('./routes/signupRoutes');
const signinRoutes = require('./routes/signinRoutes');
const sequelize = require('./config/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Route to render login form
app.get('/', (req, res) => {
  res.render('signin', { error: null }); // Pass null initially
});

// Route to render signup form
app.get('/signup', (req, res) => {
  res.render('signup'); // Assuming signup.ejs contains the signup form
});

app.use('/signup', signupRoutes);
app.use('/signin', signinRoutes);

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
