const auth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('auth?');
    next();
  }
  else {
    res.redirect('/logIn');
  }
};

module.exports = auth;