const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const CartsSchema = require("../models/schemas/carts.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");

class CartsApi {
  constructor() {
    this.cartsDAO = getDAOS(envConfig.DATA_SOURCE).cartsDAO;
    this.productsDAO = getDAOS(envConfig.DATA_SOURCE).productsDAO;
  }

  async getCarts() {
    return await this.cartsDAO.getCartsDAO();
  }

  async getCartById(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const cart = await this.cartsDAO.getCartByIdDAO(id);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    }
    return cart;
  }

  async getProductsFromACart(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const cart = await this.cartsDAO.getProductsFromACartDAO(id);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    }
    return cart;
  }


  async createCart(cartPayload) {
    await CartsSchema.validate(cartPayload);
    return await this.cartsDAO.createCartDAO(cartPayload);
  }


  async addProductToCart(idc, idp, quantity) {
    if (!idc) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The cart id param is a required field');
    }
    if (!idp) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The product id param is a required field');
    }
    if (!quantity.quantity) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The quantity param is a required field');
    }
    const product = await this.productsDAO.getProductByIdDAO(idp);
    if (!product) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The product does not exist in our records');
    }
    const cart = await this.cartsDAO.getCartByIdDAO(idc);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    } 
    const cartPayload = {
      product: product,
      quantity: quantity.quantity
    }
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === idp)
    if (productIndex==-1) {
      return await this.cartsDAO.pushProductInCartDAO(idc, cartPayload);
    }else{
      cart.products[productIndex]=cartPayload
      return await this.cartsDAO.updateCartDAO(idc, cart)
    }
  }

  async deleteAProductFromACart(idc, idp) {
    if (!idc) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The cart id param is a required field');
    }
    if (!idp) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The product id param is a required field');
    }
    const product = await this.productsDAO.getProductByIdDAO(idp);
    if (!product) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The product does not exist in our records');
    }
    const cart = await this.cartsDAO.getCartByIdDAO(idc);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    } 
    const productIndex = cart.products.findIndex(item => item.product._id.toString() === idp)
    cart.products.splice(productIndex,1)
    return await this.cartsDAO.updateCartDAO(idc, cart);
  }

  async updateCart(id, cartPayload) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    await CartsSchema.validate(cartPayload);
    return await this.cartsDAO.updateCartDAO(id, cartPayload);
  }

  async deleteCart(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    return await this.cartsDAO.deleteCartDAO(id);
  }



}

module.exports = CartsApi;