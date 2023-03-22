class UsersDTO {
    constructor(userItem, _id) {
      Object.assign(this, userItem);
      this.createdAt = userItem.createdAt || new Date().toISOString();
      this.updatedAt = new Date().toISOString();
      if (_id) {
        this._id = _id;
      }
    }
  }
  
  module.exports = UsersDTO;