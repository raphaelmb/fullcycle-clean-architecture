import { app, sequelize } from "../express";
import request from "supertest";
import e from "express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: { street: "Street", number: 123, zip: "12345", city: "City" },
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
    });
    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const customer1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City 1",
        },
      });

    const customer2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane",
        address: {
          street: "Street 2",
          number: 321,
          zip: "54321",
          city: "City 2",
        },
      });

    const response = await request(app).get("/customer").send();
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(response.body.customers[0].name).toBe("John");
    expect(response.body.customers[0].address.street).toBe("Street 1");
    expect(response.body.customers[1].name).toBe("Jane");
    expect(response.body.customers[1].address.street).toBe("Street 2");
  });
});
