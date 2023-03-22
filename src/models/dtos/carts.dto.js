class CartsDTO {
    constructor(cartItem, _id) {
      Object.assign(this, cartItem);
      this.products = cartItem.products || [];
      this.createdAt = cartItem.createdAt || new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      if (_id) {
        this._id = _id;
      }
    }
  }
  
  module.exports = CartsDTO;