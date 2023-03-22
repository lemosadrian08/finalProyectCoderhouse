const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const CartsSchema = require("../models/schemas/carts.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");
const sendEmail = require("../utils/email.utils")
const OrdersApi =require('./orders.api')
const ordersApi = new OrdersApi()

class CartsApi {
  constructor() {
    this.cartsDAO = getDAOS(envConfig.DATA_SOURCE).cartsDAO;
    this.productsDAO = getDAOS(envConfig.DATA_SOURCE).productsDAO;
    this.ordersDAO = getDAOS(envConfig.DATA_SOURCE).ordersDAO
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


  async getProductsByCategory(category) {
    if (!category) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The category param is a required field');
    }
    const product = await this.productsDAO.getProductsByCategoryDAO(category);
    if (!product) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The product does not exist in our records');
    }
    return product;
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
    if (!quantity) {
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
      quantity: parseInt(quantity)
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
    const cart = await this.cartsDAO.getCartByIdDAO(id);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    }
    return await this.cartsDAO.deleteCartDAO(id);
  }

  async checkout( address, user) {

    if (!user.cart) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The cart id param is a required field');
    }
    const cartId= user.cart
    if (!address) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The address param is a required field');
    }
    if (!user.email) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The address param is a required field');
    }
    const cart = await this.cartsDAO.getCartByIdDAO(cartId);
    if (!cart) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The cart does not exist in our records');
    }

    const orderNumber = await this.ordersDAO.getOrdersCountDAO()
    const subTotalArray = cart.products.map(item=> item.quantity*item.product.unitPrice);
    const subTotal= subTotalArray.reduce((acc,ele)=>acc+ele,0)

    const order={
      email: user.email,
      items: cart.products,
      address,
      orderNumber,
      subTotal
    };
    await this.cartsDAO.emptyCartDAO(cartId);
    const newOrder = await this.ordersDAO.createOrderDAO(order);


    const emailMappedProducts = order.items.map(x=> `<li>Product: ${x.product.name} - Quantity: ${x.quantity}</li>`).join('')

    const mailPayload = {
      from: 'Node Server',
      to: envConfig.ADMIN_EMAIL,
      subject: `A new order was placed by: ${order.email}`,
      html: `<h1>Products</h1>
      <ul>${emailMappedProducts}</ul>`
    }
    sendEmail(mailPayload)
    
    return newOrder
  }



}

module.exports = CartsApi;