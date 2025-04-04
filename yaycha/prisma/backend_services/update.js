import {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient();

prisma.user
    .upsert({
        where: { id: 1 },
        update: { name: "John" },
        create: { name: "John", bio: "John's bio" }
    })
    .then(data => {console.log(data)})
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    })