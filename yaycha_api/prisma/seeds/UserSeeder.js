const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function UserSeeder() {
  const password = await bcrypt.hash("password", 10);
  console.log("User seeding started...");

  for (let i = 0; i < 10; i++) {
    /**Fake Username */
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName} ${lastName[0]}`.toLocaleLowerCase();

    /**Fake Biography */
    const bio = faker.person.bio();

    await prisma.user.upsert({
      where: { username },
      update: {},
      create: { name, username, bio, password },
    });
  }
  console.log("User seeding done...");
}

module.exports = { UserSeeder };
