const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");
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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "username and password required" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ token, user });
    }
  }

  res.status(400).json({ msg: "incorrect password or username" });
});

module.exports = { userRouter: router };
