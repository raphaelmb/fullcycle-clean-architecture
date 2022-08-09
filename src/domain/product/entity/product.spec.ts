import Product from "./product";

describe("Product unit test", () => {
  it("should create a product", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product).toEqual({ _id: "1", _name: "Product 1", _price: 100 });
  });

  it("should throw an error if id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrowError(
      "Id is required."
    );
  });

  it("should throw an error if name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrowError("Name is required.");
  });

  it("should throw an error if price is less than zero", () => {
    expect(() => new Product("1", "Product 1", 0)).toThrowError(
      "Price must be greater than zero."
    );
  });

  it("should be able to change product's name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Changed name");
    expect(product.name).toBe("Changed name");
  });

  it("should not be able to change product's name if name is empty", () => {
    const product = new Product("1", "Product 1", 100);
    expect(() => product.changeName("")).toThrowError("Name is required.");
  });

  it("should be able to change product's price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

  it("should not be able to change product's price if price is less than zero", () => {
    const product = new Product("1", "Product 1", 100);
    expect(() => product.changePrice(0)).toThrowError(
      "Price must be greater than zero."
    );
  });
});
