const express = require("express");
const router = express.Router();
const prisma = require("../prismaClient");

router.get("/posts", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    setTimeout(() => {
      res.json(data);
    }, 2000);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });
    post ? res.json(post) : res.status(404).json({ error: "Post not found" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.comment.deleteMany({
    where: {
      postId: Number(id),
    },
  });

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  res.sendStatus(204);
});

router.delete("/comments/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.comment.findMany({
    where: { id: Number(id) },
  });

  res.sendStatus(204);
});

module.exports = { contentRouter: router };
