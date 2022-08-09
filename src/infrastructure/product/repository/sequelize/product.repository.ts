import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create({ id, name, price }: Product): Promise<void> {
    await ProductModel.create({ id, name, price });
  }
  async update({ id, name, price }: Product): Promise<void> {
    await ProductModel.update({ name, price }, { where: { id } });
  }
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });
    return new Product(product.id, product.name, product.price);
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) => new Product(product.id, product.name, product.price)
    );
  }
}
