// signinController.js

exports.renderSignInForm = (req, res) => {
    res.render('signin', { error: null }); // Pass null initially
  };
  
  exports.signInUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      // Check if user exists with provided email and password
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        // Authentication successful, redirect to dashboard or home page
        res.redirect('/');
      } else {
        // User not found or invalid credentials
        res.status(401).render('signin', { error: 'Invalid email or password.' }); // Pass error message
      }
    } catch (err) {
      next(err);
    }
  };
  