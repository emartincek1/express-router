const { Router } = require("express");
const fruitRouter = Router();
const { Fruit } = require("../models/index");
const { check, validationResult } = require("express-validator");

fruitRouter.get("/", async (req, res) => {
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

fruitRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const fruit = await Fruit.findByPk(id);
  res.json(fruit);
});

fruitRouter.post(
  "/",
  [
    check("fruit.color").not().isEmpty().trim(),
    check("fruit.name").not().isEmpty().trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const { fruit } = req.body;
      await Fruit.create(fruit);
      const fruits = await Fruit.findAll();
      res.json(fruits);
    }
  }
);

fruitRouter.put(
  "/:id",
  [
    check("fruit.color").not().isEmpty().trim(),
    check("fruit.name").not().isEmpty().trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const { id } = req.params;
      const { fruit } = req.body;
      const oldFruit = await Fruit.findByPk(id);
      await oldFruit.update(fruit);
      const fruits = await Fruit.findAll();
      res.json(fruits);
    }
  }
);

fruitRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const oldFruit = await Fruit.findByPk(id);
  await oldFruit.destroy();
  const fruits = await Fruit.findAll();
  res.json(fruits);
});

module.exports = fruitRouter;
