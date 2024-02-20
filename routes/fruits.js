const { Router } = require("express");
const fruitRouter = Router();
const { Fruit } = require("../models/index");

fruitRouter.get("/", async (req, res) => {
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

fruitRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findByPk(id);
  res.json(fruit);
});

fruitRouter.post("/", async (req, res) => {
  const { fruit } = req.body;
  await Fruit.create(fruit);
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

fruitRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { fruit } = req.body;
  const oldFruit = await Fruit.findByPk(id);
  await oldFruit.update(fruit);
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

fruitRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const oldFruit = await Fruit.findByPk(id);
  await oldFruit.destroy();
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

module.exports = fruitRouter;
