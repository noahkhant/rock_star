const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

router.get("/users", async (req, res) => {
  const data = await prisma.user.findMany({
    include: { posts: true, comments: true },
    orderBy: { id: "desc" },
    take: 20,
  });
  res.json(data);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.user.findMany({
    where: {
      id: Number(id),
    },
    include: { posts: true, comments: true },
  });
  res.json(data);
});

module.exports = { contentRouter: router };
