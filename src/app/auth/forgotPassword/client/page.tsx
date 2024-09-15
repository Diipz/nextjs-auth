"use client"

import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod"


const FormSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid NHS email address")
})

type InputType = z.infer<typeof FormSchema>;



export default function ForgotPasswordPage() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    })

    const submitRequest: SubmitHandler<InputType> = async (data) => {
        const usertype = "client";

        try {
            const result = await forgotPassword(data.email, usertype);
            toast.success("A reset password link was sent to your email");
            reset();
        } catch (error) {
            toast.error("Something went wrong!");
        };
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            <form onSubmit={handleSubmit(submitRequest)} className="flex flex-col gap-2 m-2 p-2 border rounded-md shadow">
                <div className="text-center p-2">Enter your email</div>
                <Input
                    label="Email"
                    {...register("email")}
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                    startContent={<EnvelopeIcon
                        className="w-4" />}
                />
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    color="primary">
                    {isSubmitting ? "Please wait..." : "Submit"}
                </Button>
            </form>
            <Image
                src={"/forgotPass.png"}
                width={500} height={500}
                alt="Forgot Password"
                className="col-span-2 place-self-center"
            />
        </div>
    )
}
