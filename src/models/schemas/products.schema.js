const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class ProductsSchema {
  static #schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category:yup.string().required(),
    thumbnail:yup.string().required(),
    unitPrice:yup.string().required()
  })

  constructor(product) {
    Object.assign(this, product);
  }

  static async validate(productItem) {
    try {
      return await ProductsSchema.#schema.validate(productItem);
    }
    catch(error) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'Validation error', error);
    }
   
  }
}

module.exports = ProductsSchema;