const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class CartsSchema {
  static #schema = yup.object({
    products: yup.array(),
  })

  constructor(cart) {
    Object.assign(this, cart);
  }
  
  static async validate(cartItem) {
    try {
      return await CartsSchema.#schema.validate(cartItem);
    }
    catch(error) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'Validation error', error);
    } 
  }
}

module.exports = CartsSchema;