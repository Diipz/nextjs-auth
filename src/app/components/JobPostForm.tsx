"use client";

import { Button, Input, Select, SelectItem, Selection, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { createPost } from "@/lib/actions/jobPostActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



const PostSchema = z.object({
    positionType: z
        .string()
        .min(1, "Position Type is required"),
    location: z
        .string()
        .min(1, "Location is required"),
    content: z
        .string()
        .min(1, "Content is required"),
    deadline: z
        .date()
        .transform((date) => new Date(date))
        .refine((date) => date > new Date(), {
            message: "Deadline must be a future date",
        }),
});


export type PostInputType = z.infer<typeof PostSchema>;

export default function JobPostsForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const router = useRouter();

    // Configure Nextui selection and error handling for position type
    const [selectedPositionType, setSelectedPositionType] = useState<Selection>(new Set([]));

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<PostInputType>({
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
            router.refresh();
        } catch (error) {
            toast.error("Failed to create post");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-full mx-3"
        >
            <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
                Create a New Job Post
            </div>
            <div className="p-2 flex flex-col gap-2">
                <div className="flex flex-col">
                    <Select
                        {...register("positionType")}
                        label="Select the type of position"
                        selectedKeys={selectedPositionType}
                        onSelectionChange={setSelectedPositionType}
                        isInvalid={!!errors.positionType}
                        errorMessage={errors.positionType?.message}
                        color="secondary"
                    >
                        <SelectItem key="Remote" >Remote</SelectItem>
                        <SelectItem key="Onsite" >Onsite</SelectItem>
                    </Select>
                </div>
                <Input
                    {...register("location")}
                    label="Location"
                    errorMessage={errors.location?.message}
                    isInvalid={!!errors.location}
                    color="secondary"
                />
                <Textarea
                    {...register("content")}
                    label="Information"
                    placeholder="position requirements, responsibilities, duration etc."
                    errorMessage={errors.content?.message}
                    isInvalid={!!errors.content}
                    color="secondary"
                />
                <Input
                    {...register("deadline")}
                    label="Application Deadline"
                    type="date"
                    errorMessage={errors.deadline?.message}
                    isInvalid={!!errors.deadline}
                    color="secondary"
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