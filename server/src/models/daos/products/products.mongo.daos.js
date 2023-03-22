const { MongoClient, ObjectId } = require("mongodb");
const dbConfig = require("../../../config/db.config");
const ProductsDTO = require("../../dtos/products.dto");

class ProductsMongoDAO {
  static collection = "products";

  constructor(database) {
    MongoClient.connect(dbConfig.mongo.uri)
      .then((connection) => {
        const db = connection.db(database);
        this._collection = db.collection(ProductsMongoDAO.collection);
      })
  }

  async getProductsDAO() {
    return await this._collection.find({}).toArray();
  }

  async getProductByIdDAO(id) {
      return await this._collection.findOne({ _id: new ObjectId(id) });
  }

  async getProductsByCategoryDAO(category) {
    return await this._collection.find({ category }).toArray();
}

  async createProductDAO(productPayload) {
    const newProducts = new ProductsDTO(productPayload);
    await this._collection.insertOne(newProducts);
    return newProducts;
  }

  async deleteProductDAO(id) {
    return await this._collection.deleteOne({ _id: new ObjectId(id) });
  }

  async updateProductDAO(id, item) {
    return await this._collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {...item} }
    )
  }
}

module.exports = ProductsMongoDAO;