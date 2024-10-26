import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

interface NotificationPageProps {
    params: {
        id: string;
    };
}

export default async function Notification({ params }: NotificationPageProps) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/auth/signin/associate");
    }

    // Fetch the specific notification based on the ID
    const notification = await prisma.notification.findUnique({
        where: {
            id: params.id,
        },
    });

    // Handle case where the notification is not found
    if (!notification) {
        return notFound(); // or return a custom 404 page component
    }

    // Update the notification read status to true
    await prisma.notification.update({
        where: { id: params.id },
        data: { read: true },
    });



    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center m-4 p-4 border border-gray-300 rounded">
                <h1 className="text-2xl font-bold mb-2">{notification.title}</h1>
                <p className="mb-4">{notification.message}</p>
                <p className="text-gray-600">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
            <Link href="/dashboard/associate/notifications" className="text-white">Return to Notifications Page</Link>
        </div>
    );
}
