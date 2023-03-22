const envConfig = require("../config/env.config");
const { getDAOS } = require("../models/daos/daos.factory");
const OrdersSchema = require("../models/schemas/orders.schema");
const { STATUS } = require("../utils/api.utils");
const { HTTPError } = require("../utils/errors.utils");

class OrdersApi {
  constructor() {
    this.ordersDAO = getDAOS(envConfig.DATA_SOURCE).ordersDAO;
    this.productsDAO = getDAOS(envConfig.DATA_SOURCE).productsDAO;
  }

  async getOrders() {
    return await this.ordersDAO.getOrdersDAO();
  }

  async getOrderById(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const order = await this.ordersDAO.getOrderByIdDAO(id);
    if (!order) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The order does not exist in our records');
    }
    return order;
  }

  async createOrder(orderPayload) {
    await OrdersSchema.validate(orderPayload);
    return await this.ordersDAO.createOrderDAO(orderPayload);
  }

  async deleteOrder(id) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    const order = await this.ordersDAO.getOrderByIdDAO(id);
    if (!order) {
      throw new HTTPError(STATUS.NOT_FOUND, 'The order does not exist in our records');
    }
    return await this.ordersDAO.deleteOrderDAO(id);
  }


  async updateOrder(id, orderPayload) {
    if (!id) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'The id param is a required field');
    }
    await OrdersSchema.validate(orderPayload);
    return await this.ordersDAO.updateOrderDAO(id, orderPayload);
  }
}

module.exports = OrdersApi;