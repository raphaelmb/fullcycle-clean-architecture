import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
  it("should create an order", () => {
    const orderItem = new OrderItem("1", "guitar", 500, "p1", 2);
    const order = new Order("1", "123", [orderItem]);
    expect(order).toEqual({
      _id: "1",
      _customerId: "123",
      _items: [
        {
          _id: "1",
          _name: "guitar",
          _price: 500,
          _productId: "p1",
          _quantity: 2,
        },
      ],
      _total: 1000,
    });
  });

  it("should throw an error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required.");
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrowError(
      "Customer ID is required."
    );
  });

  it("should throw an error when items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrowError("Item is required.");
  });

  it("should calculate total", () => {
    const orderItem1 = new OrderItem("1", "guitar", 500, "p1", 2);
    const orderItem2 = new OrderItem("2", "amp", 700, "p2", 1);
    const order = new Order("1", "123", [orderItem1, orderItem2]);
    expect(order.total()).toBe(1700);
  });

  it("should throw error if item quantity is less than or zero", () => {
    const orderItem = new OrderItem("1", "guitar", 500, "p1", 0);
    expect(() => new Order("1", "123", [orderItem])).toThrowError(
      "Quantity must be greater than 0."
    );
  });
});
