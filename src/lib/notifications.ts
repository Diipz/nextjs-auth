import { prisma } from "@/lib/prisma"; 

export async function getNotificationsCount(email: string | undefined) {
    if (!email) {
        return 0;
    }

    // Fetch associate by email
    const associate = await prisma.associate.findUnique({
        where: { email },
    });

    if (associate) {
        // Fetch notification count
        return await prisma.notification.count({
            where: {
                associateId: associate.id,
                read: false,
            },
        });
    }

    return 0;
}
