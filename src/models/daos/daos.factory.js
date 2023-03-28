const ProductsMongoDAO = require('./products/products.mongo.daos');
const CartsMongoDAO = require('./carts/carts.mongo.daos');
const MessagesMongoDAO = require('./messages/messages.mongo.daos');
const OrdersMongoDAO = require('./orders/orders.mongo.daos');
const UsersMongoDAO = require('./users/users.mongo.daos');

const getDAOS = (type) => {
  let productsDAO;
  let cartsDAO;
  let messagesDAO;
  let ordersDAO;
  let usersDAO;

  switch(type.toLowerCase()) {
    /* case 'mem': 
      productsDAO = new ProductsMemDAO();
      break; */
    case 'mongo':
      productsDAO = new ProductsMongoDAO("Ecommerce");
      cartsDAO = new CartsMongoDAO("Ecommerce");
      messagesDAO = new MessagesMongoDAO("Ecommerce");
      ordersDAO = new OrdersMongoDAO("Ecommerce");
      usersDAO = new UsersMongoDAO("Ecommerce");
      break;
    default:
      throw new Error("Invalid data source");
  }
  return {
    
    productsDAO,
    cartsDAO,
    messagesDAO,
    ordersDAO,
    usersDAO
  }
}

module.exports = {
  getDAOS,
}