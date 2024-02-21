const request = require("supertest");
const app = require("./src/app");
const { User, Fruit } = require("./models/index");
const syncSeed = require("./seed");

describe("User Tests", () => {
  beforeAll(async () => {
    await syncSeed();
  });

  test("get users returns correct response", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: "User 1",
        age: 30,
      })
    );
    const users = await User.findAll();
    expect(response.body.length).toBe(users.length);
  });

  test("post users returns correct response", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        user: {
          name: "User 5",
          age: 10,
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[4]).toEqual(
      expect.objectContaining({
        name: "User 5",
        age: 10,
      })
    );
    const users = await User.findAll();
    expect(response.body.length).toBe(users.length);
  });

  test("put users returns correct response", async () => {
    const response = await request(app)
      .put("/users/4")
      .send({
        user: {
          name: "User 4",
          age: 10,
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toEqual(
      expect.objectContaining({
        name: "User 4",
        age: 10,
      })
    );
    const users = await User.findAll();
    expect(response.body.length).toBe(users.length);
  });

  test("delete users returns correct response", async () => {
    const response = await request(app).delete("/users/4");
    expect(response.statusCode).toBe(200);
    expect(response.body[4]).toEqual(undefined);
    const users = await User.findAll();
    expect(response.body.length).toBe(users.length);
  });

  test("post users returns errors array if feilds aren't provided", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        user: { age: 10 },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("post users returns errors array if name is too short", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        user: { naem: "fe", age: 10 },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("put users returns errors array if feilds aren't provided", async () => {
    const response = await request(app)
      .put("/users/1")
      .send({
        user: { age: 10 },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });
});

describe("fruit Tests", () => {
  beforeAll(async () => {
    await syncSeed();
  });

  test("get fruits returns correct response", async () => {
    const response = await request(app).get("/fruits");
    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        name: "Apple",
        color: "Red",
      })
    );
    const fruits = await Fruit.findAll();
    expect(response.body.length).toBe(fruits.length);
  });

  test("post fruits returns correct response", async () => {
    const response = await request(app)
      .post("/fruits")
      .send({
        fruit: {
          name: "Watermellon",
          color: "Red",
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[4]).toEqual(
      expect.objectContaining({
        name: "Watermellon",
        color: "Red",
      })
    );
    const fruits = await Fruit.findAll();
    expect(response.body.length).toBe(fruits.length);
  });

  test("put fruits returns correct response", async () => {
    const response = await request(app)
      .put("/fruits/4")
      .send({
        fruit: {
          name: "WaterMellon",
          color: "Red",
        },
      });
    expect(response.statusCode).toBe(200);
    expect(response.body[3]).toEqual(
      expect.objectContaining({
        name: "WaterMellon",
        color: "Red",
      })
    );
    const fruits = await Fruit.findAll();
    expect(response.body.length).toBe(fruits.length);
  });

  test("delete fruits returns correct response", async () => {
    const response = await request(app).delete("/fruits/4");
    expect(response.statusCode).toBe(200);
    expect(response.body[4]).toEqual(undefined);
    const fruits = await Fruit.findAll();
    expect(response.body.length).toBe(fruits.length);
  });

  test("post fruits returns errors array if feilds aren't provided", async () => {
    const response = await request(app)
      .post("/fruits")
      .send({
        fruit: { name: "qweqwqw" },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("post fruits returns errors array if name is too short", async () => {
    const response = await request(app)
      .post("/fruits")
      .send({
        fruit: { name: "qwe", color: "red" },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });

  test("put fruits returns errors array if feilds aren't provided", async () => {
    const response = await request(app)
      .put("/fruits/1")
      .send({
        fruit: { name: "qweqwqwq" },
      });
    expect(response.body).toHaveProperty("error");
    expect(Array.isArray(response.body.error)).toBe(true);
  });
});
