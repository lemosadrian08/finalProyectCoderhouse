const auth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/logIn');
  }
};

module.exports = auth;