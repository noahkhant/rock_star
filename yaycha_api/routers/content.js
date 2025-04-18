const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.post.findMany({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = { contentRouter: router };
