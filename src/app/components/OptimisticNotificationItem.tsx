"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface NotificationItemProps {
    notificationId: string;
    title: string;
    message: string;
    createdAt: string | Date;
    isRead: boolean;
    markNotificationAsRead: (id: string) => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
}

export default function NotificationItem({
    notificationId,
    title,
    message,
    createdAt,
    isRead,
    markNotificationAsRead,
    deleteNotification,
}: NotificationItemProps) {
    const router = useRouter();
    const [read, setRead] = useState(isRead);
    const [isPending, setIsPending] = useState(false);

    const handleMarkAsRead = async () => {
        if (!read) {
            setRead(true);
        }

        setIsPending(true);
        try {
            await markNotificationAsRead(notificationId);
            router.push(`/dashboard/associate/notifications/${notificationId}`);
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        } finally {
            setIsPending(false);
        }
    };

    const handleDelete = async () => {
        setIsPending(true);
        try {
            await deleteNotification(notificationId);
            // Optionally navigate or update state to reflect deletion
            router.push("/dashboard/associate/notifications"); // Redirect or update state
        } catch (error) {
            console.error("Failed to delete notification:", error);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className={`m-4 p-4 rounded-lg transition-all duration-300 ${read ? 'bg-transparent' : 'bg-[#5D2CA8] text-white'}`}>
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm">{message}</p>
            <p className="text-xs text-gray-300">{new Date(createdAt).toLocaleString()}</p>
            <div className="flex space-x-2 mt-2">
                <button
                    onClick={handleMarkAsRead}
                    disabled={isPending}
                    className={`px-3 py-1 rounded bg-blue-500 text-white ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Mark as Read
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className={`px-3 py-1 rounded bg-red-500 text-white ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Delete
                </button>
            </div>
            {isPending && <p className="mt-2 text-sm text-gray-300">Loading...</p>}
        </div>
    );
}
