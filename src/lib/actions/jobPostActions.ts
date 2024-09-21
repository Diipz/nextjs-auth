// utils/postActions.ts
"use server";

import prisma from "../prisma"; 
import { PostInputType } from "@/app/components/JobPostForm";

export async function createPost(postData: PostInputType, userId: string) {


    const post = await prisma.post.create({
        data: {
            ...postData,
            userId,
        },
    });

    // Get all associates
    const associates = await prisma.associate.findMany({
        select: {
            id: true, // Only select the `id` field
        },
    });

    const associateIds = associates.map(associate => associate.id);


    await Promise.all(
        associateIds.map(associateId =>
            prisma.notification.create({
                data: {
                    title: post.title,
                    message: post.content,
                    associateId,
                    postId: post.id,
                },
            })
        )
    );

    return post;
}
