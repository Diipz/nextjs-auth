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

    const handleRedirect = async () => {
        if (!read) {
            setRead(true);
            try {
                // Attempt to mark notification as read on the server
                await markNotificationAsRead(notificationId);
            } catch (error) {
                console.error("Failed to mark notification as read:", error);
                // Revert the state back to false if the operation fails
                setRead(false);
            }
        }
        router.push(`/dashboard/associate/notifications/${notificationId}`);
    };

    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the redirect
        // Optimistically set the read state to true
        if (!read) {
            setRead(true);
            try {
                // Attempt to mark notification as read on the server
                await markNotificationAsRead(notificationId);
            } catch (error) {
                console.error("Failed to mark notification as read:", error);
                // Revert the state back to false if the operation fails
                setRead(false);
                router.refresh();
            }
        }
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the redirect

        try {
            // Attempt to mark notification as read on the server
            await deleteNotification(notificationId);
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            // Revert the state back to false if the operation fails
            setRead(false);
            router.refresh();
        }

    };

    return (
        <div className="m-4">
            <button
                onClick={handleRedirect}
                className={`p-4 rounded-lg transition-all duration-300 
                ${read ? 'bg-transparent' : 'bg-[#5D2CA8] text-white'} 
                cursor-pointer w-full text-left`}
            >
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm">{message}</p>
                <p className="text-xs text-gray-300">{new Date(createdAt).toLocaleString()}</p>
            </button>
            <div className="mt-2 flex space-x-2">
                <button
                    onClick={handleMarkAsRead}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Mark as Read
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
