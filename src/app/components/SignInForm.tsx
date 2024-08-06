"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
    callbackUrl?: string;
}

const FormSchema = z.object({
    email: z.string().email("Please enter a valid NHS email address"),
    password: z.string({
        required_error: "Please enter your password"
    })
})

//define new Typescript type using "type"
//"z.infer" is a utility provided by zod that infers the TypeScript type from the given zod schema. "typeof FormSchema" is used to refer to the type of the FormSchema object
type InputType = z.infer<typeof FormSchema>

export default function SignInForm(props: Props) {

    const router = useRouter();

    const [visiblePass, setVisiblePass] = useState(false);

    const {
        register,
        handleSubmit,
        //extract "errors" & "isSubmitting" from formState (from react-form-hook)
        formState: { errors, isSubmitting }
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    //SubmitHandler from react-hook-form
    const onSubmit: SubmitHandler<InputType> = async (data) => {
        //when calling "signIn" function from next/auth, we are actually calling the "authorize" function from "CredentialsProvider" on line 30 of /api/auth/route.ts
        const result = await signIn("credentials", {
            //stop page refresh
            redirect: false,
            username: data.email,
            password: data.password
        })
        if (!result?.ok) {
            toast.error(result?.error);
            return;
        }

        toast.success("Sign in successful");
        router.push("/");
    }

    return (
        //handleSubmit comes from useForm (from react-form-hook)
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-full">
            <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
                Sign In Form
            </div>
            <div className="p-2 flex flex-col gap-2">
                <Input
                    {...register("email")}
                    label="Email"
                    errorMessage={errors.email?.message}
                    isInvalid={!!errors.email}
                />
                <Input
                    {...register("password")}
                    label="Password"
                    type={visiblePass ? "text" : "password"}
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
                <div className="flex items-center justify-center gap-2">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                    <Button as={Link} href="/auth/signup">Sign Up</Button>
                </div>
            </div>
        </form>
    )
}

