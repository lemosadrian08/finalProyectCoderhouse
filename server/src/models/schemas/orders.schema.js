const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class OrdersSchema {
  static #schema = yup.object({
    email:yup.string().email().required(),
    items:yup.array().required(),
    orderNumber:yup.number(),
    address:yup.string().required(),
    state:yup.string(),
    subTotal:yup.number(),
  })



  constructor(order) {
    Object.assign(this, order);
  }

  static async validate(orderItem) {
    try {
      return await OrdersSchema.#schema.validate(orderItem);
    }
    catch(error) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'Validation error', error);
    }
   
  }
}

module.exports = OrdersSchema;