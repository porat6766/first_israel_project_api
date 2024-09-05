const request = require("supertest");
const app = require("../server.js"); // Adjust this path to point to your Express app

describe("/api/product/get/:id", () => {
  it("should get product by id", async () => {
    const response = await request(app).get("/api/product/get/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(typeof response.body.id).toBe(`number`);
    expect(response.body.id).toBe(1);
    expect(response.body.title).toBeDefined();
    expect(typeof response.body.title).toBe("string");
  });
  it("get error because product not exist", async () => {
    const response = await request(app).get("/api/product/get/32132");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("id not exist");
  });
  it("get error because product not exist", async () => {
    const response = await request(app).get("/api/product/get/dgrfdrg");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("id not exist");
  });
  it("get error because product not exist", async () => {
    const response = await request(app).get("/api/product/get/-1");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("id not exist");
  });
});

describe("POST api/product/add", () => {
  test("add product", async () => {
    const data = {
      title: "test productp",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https:",
      category: "electronic",
    };
    const response = await request(app).post("/api/product/add").send(data);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe(`object`);
    expect(typeof response.body.price).toBe("number");
    expect(typeof response.body.image).toBe("string");
  });
  test("invaild field: add product", async () => {
    const data = {};
    const response = await request(app).post("/api/product/add").send(data);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("probably you miss field");
  });
});
