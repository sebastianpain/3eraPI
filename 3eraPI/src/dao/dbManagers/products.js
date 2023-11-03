import productsModel from "../models/products.js";

export default class Products {
  constructor() {
    console.log("Estamos trabajando con bd mongo");
  }

  getAll = async () => {
    let products = await productsModel.find().lean().populate("Users");
    return products;
  };

  saveProduct = async (product) => {
    let result = await productsModel.create(course);
    return result;
  };

  getBy = async (id) => {
    let result = await productsModel.findOne({ _id: id }).populate("Users");
    return result;
  };

  updateProduct = async (id, product) => {
    delete course._id;
    let result = await productsModel.updateOne({ _id: id }, { $set: product });
    return result;
  };
}