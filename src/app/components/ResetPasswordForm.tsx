"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import PasswordStrength from "./PasswordStrength";
import { resetPassword } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
    jwtUserId: string,
    usertype: string
}

const FormSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be less than 30 characters"),
    confirmPassword: z
        .string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
})

type InputType = z.infer<typeof FormSchema>;

export default function ResetPasswordForm({ jwtUserId, usertype }: Props) {

    const router = useRouter();

    const [passStrength, setPassStrength] = useState(0);
    const [visiblePass, setVisiblePass] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    })

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id)
    }, [watch]);


    const resetPass: SubmitHandler<InputType> = async (data) => {
        try {
            const result = await resetPassword(jwtUserId, usertype, data.password);

            if (result === "success") toast.success("Password Reset Successful");
            router.push(`/auth/signin/${usertype}`);

        } catch (error) {
            toast.error("Something went wrong!");
        }

    }

    return (
        <form onSubmit={handleSubmit(resetPass)} className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow w-full" >
            <div className="text-center p-2">Reset your password</div>
            <Input
                type={visiblePass ? "text" : "password"}
                label="Password"
                {...register("password")}
                errorMessage={errors.password?.message}
                endContent={
                    <button
                        type="button"
                        onClick={() => setVisiblePass((prev) => !prev)}>
                        {visiblePass ? (
                            <EyeSlashIcon className="w-4" />
                        ) : (
                            <EyeIcon className="w-4" />
                        )}
                    </button>
                }
            />
            <PasswordStrength passStrength={passStrength} />
            <Input
                type={visiblePass ? "text" : "password"}
                label="Confirm password"
                {...register("confirmPassword")}
                errorMessage={errors.confirmPassword?.message}
            />
            <div className="flex justify-center">
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    color="primary">
                    {isSubmitting ? "Please wait..." : "Submit"}
                </Button>
            </div>
        </form>
    )
}
