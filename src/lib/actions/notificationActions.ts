"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";


export async function markNotificationAsRead(notificationId: string) {
    try {
        // Update the notification read status to true
        await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
        revalidatePath("/dashboard/associate/notifications");
    } catch (error) {
        console.error("Error updating notification:", error);
        throw new Error("Could not update notification"); // Re-throw the error for handling in the UI
    }
}

export async function deleteNotification(notificationId: string) {
    try {
        // Delete the notification from the database
        await prisma.notification.delete({
            where: { id: notificationId },
        });
        revalidatePath("/dashboard/associate/notifications");
    } catch (error) {
        console.error("Error deleting notification:", error);
        throw new Error("Could not delete notification"); // Re-throw the error for handling in the UI
    }
}


