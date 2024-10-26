"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface NotificationItemProps {
    notificationId: string;
    postId: string;
    associateId: string;
    title: string;
    positionType: string;
    message: string;
    createdAt: string | Date;
    deadline: string | Date;
    isRead: boolean;
    markNotificationAsRead: (id: string) => Promise<void>;
    applyToPostion: (postId: string, associateId: string) => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
}

export default function NotificationItem({
    notificationId,
    postId,
    associateId,
    title,
    positionType,
    message,
    createdAt,
    deadline,
    isRead,
    markNotificationAsRead,
    applyToPostion,
    deleteNotification,
}: NotificationItemProps) {

    const router = useRouter();
    const [read, setRead] = useState(isRead);
    const [applied, setApplied] = useState(false);

    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const isDeadlinePassed = currentDate > deadlineDate;

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

    const handleApply = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent redirect from notification item
        if (!applied && !isDeadlinePassed) {
            setApplied(true);
            try {
                // Call the applyToPost function to store associate's application to the post
                await applyToPostion(postId, associateId);
                toast.success("Successfully applied to the position!");
            } catch (error) {
                console.error("Failed to apply to post:", error);
                toast.error("Failed to apply. Please try again.");
                setApplied(false);
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
                <p className="text-sm font-semibold">{positionType}</p>
                <p className="text-sm">{message}</p>
                <p className="text-xs text-gray-300">
                    <strong>Created:</strong> {new Date(createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-red-500">
                    <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
                </p>
            </button>
            <div className="mt-2 flex space-x-2">
                <button
                    onClick={handleApply}
                    className={`bg-green-500 text-white px-4 py-2 rounded ${applied ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={applied}
                >
                    {applied ? 'Applied' : 'Apply'}
                </button>
                <button
                    onClick={handleMarkAsRead}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Mark as Read
                </button>
                <button
                    onClick={handleRedirect}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Details
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
