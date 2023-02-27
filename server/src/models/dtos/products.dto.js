class ProductsDTO {
    constructor(productItem, _id) {
      Object.assign(this, productItem);
      this.createdAt = productItem.createdAt || new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      if (_id) {
        this._id = _id;
      }
    }
  }
  
  module.exports = ProductsDTO;