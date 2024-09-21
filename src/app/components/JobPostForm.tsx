"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { createPost } from "@/lib/actions/jobPostActions";
import { useSession } from "next-auth/react";


const PostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
})


export type PostInputType = z.infer<typeof PostSchema>;

export default function JobPostsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: session } = useSession();
    const userId = session?.user?.id;


    const { register, reset, handleSubmit, formState: { errors } } = useForm<PostInputType>({
        resolver: zodResolver(PostSchema),
    });

    const onSubmit: SubmitHandler<PostInputType> = async (data) => {
        if (!userId) {
            toast.error("User ID is missing");
            return;
        }

        setIsSubmitting(true);
        try {
            await createPost(data, userId);
            toast.success("Post created successfully!");
            reset();
        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };




    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-full">
            <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
                Create a New Job Post
            </div>
            <div className="p-2 flex flex-col gap-2">
                <Input
                    {...register("title")}
                    label="Title"
                    errorMessage={errors.title?.message}
                    isInvalid={!!errors.title}
                />
                <Input
                    {...register("content")}
                    label="Content"
                    errorMessage={errors.content?.message}
                    isInvalid={!!errors.content}
                />
                <div className="flex items-center justify-center gap-2">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Post"}
                    </Button>
                </div>
            </div>
        </form>
    );
}