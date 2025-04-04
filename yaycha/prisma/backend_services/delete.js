import {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient();

/** Error Deletion */
// prisma.user
//     .delete({
//         where: { id: 1 },
//     })
//     .then(() => console.log("Successfully deleted"))
//     .catch(e => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(() => prisma.$disconnect());

/** Successful deletion */

prisma.post.deleteMany({
    where: { userId: 1 }
}).then(() => {
    prisma.user
        .delete({
            where: {id : 1}
        })
        .then(() => {
            console.log("Successfully deleted");
        })
        .catch(e => {
            console.error(e);
            process.exit(1);
        })
}).finally(() => prisma.$disconnect());