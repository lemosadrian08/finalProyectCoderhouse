const { successResponse, STATUS } = require("../utils/api.utils");
const ProductsApi = require('../api/products.api');
const productsApi = new ProductsApi();
const CartsApi = require('../api/carts.api');
const cartsApi = new CartsApi();
const config = require('../config/env.config')
const logger = require('../utils/logger.utils');

class WebController {
  constructor() {
    
  }


  async renderChat(req, res, next) {
    try {
      res.status(STATUS.OK).render('chat');
  }
  catch(error) {
    next(error);
  }
}

async renderServerInfo(req, res, next) {
  try {
    res.status(STATUS.OK).render('serverInfo', { config });
}
catch(error) {
  next(error);
}
}


  async renderProducts(req, res, next) {
    try {
      const products = await productsApi.getProducts();
      res.status(STATUS.OK).render('products', { products });
    }
    catch(error) {
      next(error);
    }
  }

  async renderProductView(req, res, next) {
    const { idp } = req.params;
    const cartId = req.user.cart;

    try {
      const product = await productsApi.getProductById(idp);
      res.status(STATUS.OK).render('productView', { product, cartId });
    }
    catch(error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next) {
    const { idc , idp } = req.params;
    const {quantity} = req.body;


    try {
      await cartsApi.addProductToCart(idc, idp, quantity);
      const cart = await cartsApi.getProductsFromACart(idc);
      res.status(STATUS.OK).render('cart', { cart });
    }
    catch(error) {
      next(error);
    }
  }



  async renderIndex(req, res, next) {
    try {
      const user = req.user;
      res.status(STATUS.OK).render('index', { user });
    }
    catch(error) {
      next(error);
    }
  }

  async renderCart(req, res, next) {
    try {
      const id = req.user.cart;
      const cart = await cartsApi.getProductsFromACart(id);
      res.status(STATUS.OK).render('cart', { cart });
    }
    catch(error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy(error => {
        if (error) {
          logger.log('error', error)
          res.clearCookie('my-session');
        }
        else {
          res.clearCookie('my-session');
          res.redirect('/');
        }
      })
    }
    catch(error) {
      logger.log('error', error)
    }
  };



  async checkout(req, res, next) {
    const { address } = req.body;
    const user = req.user;
    try {
      const order = await cartsApi.checkout(address, user);
      res.status(STATUS.OK).render('checkout');
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = WebController;
