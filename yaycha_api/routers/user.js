const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

const bcrypt = require("bcrypt");

router.post("/users", async (req, res) => {
  const { name, username, bio, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ msg: "name, username and password is required" });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, username, password: hash, bio },
  });
  res.json(user);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    include: { posts: true, comments: true },
  });
  res.json(data);
});

module.exports = { userRouter: router };
