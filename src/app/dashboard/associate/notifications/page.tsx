"use server"

import { markNotificationAsRead, deleteNotification } from "@/lib/actions/notificationActions";
import NotificationItem from "@/app/components/NotificationItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function NotificationsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/signin/associate");
    }

    const notifications = await prisma.notification.findMany({
        where: {
            associateId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });



    return (
        <div className="flex flex-col justify-center items-center m-4">
            <h1 className="text-2xl font-bold">List of Notifications</h1>
            <div className="flex flex-col">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notificationId={notification.id}
                            title={notification.title}
                            message={notification.message}
                            createdAt={notification.createdAt}
                            isRead={notification.read}
                            markNotificationAsRead={markNotificationAsRead}
                            deleteNotification={deleteNotification}
                        />
                    ))
                ) : (
                    <p>No notifications found.</p>
                )}
            </div>
        </div>
    );
}
