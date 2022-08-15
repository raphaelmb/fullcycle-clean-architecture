import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {
  it("should create a new customer", () => {
    const customer = new Customer("1", "Raphael");
    expect(customer).toEqual({
      _id: "1",
      _name: "Raphael",
      _active: true,
      _rewardPoints: 0,
      notification: {
        errors: [],
      },
    });
  });

  it("should not create a new customer an empty id", () => {
    expect(() => new Customer("", "Raphael")).toThrowError(
      "customer: Id is required."
    );
  });

  it("should not create a new customer an empty name", () => {
    expect(() => new Customer("1", "")).toThrowError(
      "customer: Name is required."
    );
  });

  it("should not create a new customer an empty name and empty id", () => {
    expect(() => new Customer("", "")).toThrowError(
      "customer: Id is required.,customer: Name is required."
    );
  });

  it("should change name", () => {
    const customer = new Customer("1", "Raphael");
    customer.changeName("Teste");
    expect(customer.name).toBe("Teste");
  });

  // it("should not change name", () => {
  //   expect(() => {
  //     const customer = new Customer("1", "Raphael");
  //     customer.changeName("");
  //   }).toThrowError("customer: Name is required.");
  // });

  it("should activate customer", () => {
    const customer = new Customer("1", "Raphael");
    const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Raphael");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  // it("should throw error when address is empty when activating a customer", () => {
  //   const customer = new Customer("1", "Raphael");
  //   expect(() => customer.activate()).toThrowError(
  //     "customer: Address is required."
  //   );
  // });

  it("should add reward points", () => {
    const customer = new Customer("1", "Raphael");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
