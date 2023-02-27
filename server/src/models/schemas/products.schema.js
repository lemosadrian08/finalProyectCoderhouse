const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class ProductsSchema {
  static #schema = yup.object({
    name: yup.string(),
    /* 

    description: { type: String },
    code: { type: String },
    price: { type: String },
    img: { type: String }
    
    
    cuerpo: yup.string().required(),
    autor: yup.string().required(),
    imagen: yup.string(),
    email: yup.string().email().required(),
    vista: yup.boolean().default(false).required(), */
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