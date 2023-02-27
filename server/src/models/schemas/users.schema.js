const yup = require('yup');
const { STATUS } = require('../../utils/api.utils');
const { HTTPError } = require('../../utils/errors.utils');

class UsersSchema {
  static #schema = yup.object({
    email: yup.string().email(),
    password: yup.string().required(),
    fullName: yup.string().required(),
    address: yup.string().required(),
    phoneNumber:yup.string().required(),
    age: yup.string().required(),
/*     image: yup.string().required(), */
    cart: yup.object()
  })

  constructor(user) {
    Object.assign(this, user);
  }
  

  static async validate(userItem) {
    try {
      return await UsersSchema.#schema.validate(userItem);
    }
    catch(error) {
      throw new HTTPError(STATUS.BAD_REQUEST, 'Validation error', error);
    }
   
  }
}

module.exports = UsersSchema;