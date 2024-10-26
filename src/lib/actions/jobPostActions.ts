// utils/postActions.ts
"use server";

import prisma from "../prisma"; 
import { PostInputType } from "@/app/components/JobPostForm";

export async function createPost(postData: PostInputType, userId: string) {
    try {
        // Step 1: Create the post
        const post = await prisma.post.create({
            data: {
                ...postData,
                userId,
            },
        });

        // Step 2: Fetch all associates' IDs
        const associates = await prisma.associate.findMany({
            select: {
                id: true, // Only select the `id` field
            },
        });

        if (!associates.length) {
            throw new Error("No associates found to notify.");
        }

        const associateIds = associates.map((associate) => associate.id);

        // Step 3: Send notifications to all associates
        await Promise.all(
            associateIds.map((associateId) =>
                prisma.notification.create({
                    data: {
                        title: `${post.location} Job Alert`,
                        positionType: post.positionType,
                        message: post.content,
                        deadline: post.deadline,
                        associateId,
                        postId: post.id,
                    },
                })
            )
        );

        // Step 4: Return the created post
        return post;

    } catch (error) {
        console.error("Error creating post or sending notifications:", error);
        throw new Error("Failed to create post or send notifications. Please try again.");
    }
}

export async function applyToPostion(postId: string, associateId: string) {
    try {
        // Step 1: Find the post to ensure it exists
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new Error("Position no longer available.");
        }

        // Step 2: Link the associate to the post
        await prisma.post.update({
            where: { id: postId },
            data: {
                associates: {
                    // Link associate to post
                    connect: { id: associateId }, 
                },
            },
        });

        return;
    } catch (error) {
        console.error("Error applying to post:", error);
        throw new Error("Failed to apply to the position. Please try again.");
    }
}
