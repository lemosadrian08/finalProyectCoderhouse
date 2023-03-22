const { Router } = require("express");
const path =require('path');
const passport =require('../middlewares/passport.middleware')
const auth = require('../middlewares/auth.middleware')
const router = Router();

const multer = require('multer');
const storage = require('../middlewares/multer.middleware')
const upload = multer({ storage: storage });
const WebController = require('../controllers/web.controller')
const webController = new WebController();


router.get('/chat',auth,webController.renderChat);
router.get('/serverInfo',auth,webController.renderServerInfo);
router.get('/products',auth,webController.renderProducts);
router.get('/',auth, webController.renderIndex);
router.get('/logout',auth, webController.logout);
router.get('/cart',auth, webController.renderCart);
router.get('/products/:idp',auth, webController.renderProductView);
router.post('/checkout',auth, webController.checkout)
router.post('/carts/:idc/products/:idp',auth, webController.addProductToCart);


router.post('/logIn',
passport.authenticate('logIn', {
  failureRedirect: '/logIn-error', 
  successRedirect: '/'
}));
    
router.post('/signUp',
upload.single('image'),
passport.authenticate('signUp', {
  failureRedirect: '/signUp-error',
  successRedirect: '/logIn'
}));
 
  
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


module.exports = router;

