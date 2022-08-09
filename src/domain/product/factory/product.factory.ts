import Product from "../entity/product";
import ProductInteface from "../entity/product.interface";
import { randomUUID } from "node:crypto";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInteface {
    switch (type) {
      case "a":
        return new Product(randomUUID(), name, price);
      case "b":
        return new ProductB(randomUUID(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
