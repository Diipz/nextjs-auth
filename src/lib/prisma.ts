//Every time CRUD operation performed a new PrismaClient must be instantiated 
//More efficient to create global PrismaClient

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;

export default prisma;