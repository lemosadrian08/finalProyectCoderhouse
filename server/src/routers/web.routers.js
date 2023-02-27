const { Router } = require("express");
const path =require('path');
const passport =require('../middlewares/passport.middleware')
const auth = require('../middlewares/auth.middleware')
const router = Router();


router.post('/logIn',
passport.authenticate('logIn', {
  failureRedirect: '/logIn-error',
    successRedirect: '/home'
    })
    );
    
 

router.post('/signUp',
passport.authenticate('signUp', { 
        failureRedirect: '/signUp-error',
        successRedirect: '/logIn'
      })
  );
 
  
router.get('/unauthorized', (req, res) => {
  res.status(401).sendFile(path.resolve(__dirname,'../public/unauthorized.html'));
});

router.get('/error', (req, res) => {
  res.status(500).sendFile(path.resolve(__dirname,'../public/error.html'));
});

router.get('/signUp', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/register.html'));
  });

router.get('/signup-error', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/signUp-error.html'));
  });

router.get('/logIn-error', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/logIn-error.html'));
  });

router.get('/logIn', (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/login.html'));
  });
  router.get('/home',auth, (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/home.html'));
  });
  router.get('/profile',auth, (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/profile.html'));
  });
  router.get('/',auth, (req, res) => {
    return res.sendFile(path.resolve(__dirname,'../public/home.html'));
  });  
module.exports = router;

