import {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient();

prisma.user
    .create({
        data: {
            name: "Noah",
            bio: "profile Bio",
            posts: {
                create: [
                    { content: "First Post" },
                    { content: "Second Post" },
                ],
            },
        },
    })
    .then(() => {
        console.log("Inserted User Noah with Posts");
    })
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    })