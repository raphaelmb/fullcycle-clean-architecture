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
    await request(app)
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

    await request(app)
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
    const customer1 = response.body.customers[0];
    const customer2 = response.body.customers[1];
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    expect(customer1.name).toBe("John");
    expect(customer1.address.street).toBe("Street 1");
    expect(customer2.name).toBe("Jane");
    expect(customer2.address.street).toBe("Street 2");

    const responseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(responseXML.status).toBe(200);
    expect(responseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(responseXML.text).toContain(`<customers>`);
    expect(responseXML.text).toContain(`<customer>`);
    expect(responseXML.text).toContain(`<name>John</name>`);
    expect(responseXML.text).toContain(`<address>`);
    expect(responseXML.text).toContain(`<street>Street 1</street>`);
    expect(responseXML.text).toContain(`<city>City 1</city>`);
    expect(responseXML.text).toContain(`<number>123</number>`);
    expect(responseXML.text).toContain(`<zip>12345</zip>`);
    expect(responseXML.text).toContain(`</address>`);
  });
});
