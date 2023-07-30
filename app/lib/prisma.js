import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
    let prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    let prisma = global.prisma;
}

export default prisma;