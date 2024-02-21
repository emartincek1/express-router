const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/index");
const { check, validationResult } = require("express-validator");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.json(user);
});

userRouter.post(
  "/",
  [
    check("user.name").not().isEmpty().trim().isLength({ min: 5, max: 15 }),
    check("user.age").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const { user } = req.body;
      await User.create(user);
      const users = await User.findAll();
      res.json(users);
    }
  }
);

userRouter.put(
  "/:id",
  [
    check("user.name").not().isEmpty().trim().isLength({ min: 5, max: 15 }),
    check("user.age").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const { id } = req.params;
      const { user } = req.body;
      const oldUser = await User.findByPk(id);
      await oldUser.update(user);
      const users = await User.findAll();
      res.json(users);
    }
  }
);

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const oldUser = await User.findByPk(id);
  await oldUser.destroy();
  const users = await User.findAll();
  res.json(users);
});

module.exports = userRouter;
