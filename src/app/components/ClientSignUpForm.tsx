
"use client"

import { EnvelopeIcon, EyeIcon, EyeSlashIcon, KeyIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordStrength } from "check-password-strength";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const FormSchema = z.object({
    firstName: z
        .string()
        .min(2, "First Name must be atleast 2 characters")
        .max(25, "First Name must be less than 25 characters")
        .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    lastName: z
        .string()
        .min(2, "Last Name must be at least 2 characters")
        .max(25, "Last Name must be less than 25 characters")
        .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),
    email: z
        .string()
        .email("Please enter a valid NHS email address")
        .regex(new RegExp("^[A-Za-z0-9._%+-]+@nhs\.net$"), "Please enter a valid NHS email address"),
    phone: z
        .string()
        .refine(validator.isMobilePhone),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be less than 30 characters"),
    confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(30, "Password must be less than 30 characters"),
    accepted: z.literal(true, {
        errorMap: () => ({
            message: "Please accept all terms"
        })
    })
    //takes whole object (data) amd compares password and confirm password fields
    //refine() returns true/false depending if pattern satisfied    
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password do not match",
    path: ["confirmPassword"],
})

type InputType = z.infer<typeof FormSchema>

export default function ClientSignUpForm() {

    const router = useRouter();

    //integrate React-hook-form with SignUpForm
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    });

    const [passStrength, setPassStrength] = useState(0);
    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);

    //password strength feature
    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id)
    }, [watch().password]);

    //obtain SubmitHandler from React-hook-form
    const saveUser: SubmitHandler<InputType> = async (data) => {
        const { accepted, confirmPassword, ...user } = data;
        try {
            const result = await registerUser(user);
            toast.success("An activation link has been sent to your email");
            router.push("/auth/signin");

        } catch (error) {
            toast.error("Something Went Wrong");
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md">
            <Input
                {...register("firstName")}
                id="firstName"
                errorMessage={errors.firstName?.message}
                isInvalid={!!errors.firstName}
                label="First Name"
                startContent={<UserIcon className="w-4" />}
            />
            <Input
                {...register("lastName")}
                id="lastName"
                errorMessage={errors.lastName?.message}
                isInvalid={!!errors.lastName}
                label="Last Name"
                startContent={<UserIcon className="w-4" />}
            />
            <Input
                {...register("email")}
                id="email"
                autoComplete="on"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                label="Email"
                className="col-span-2"
                startContent={<EnvelopeIcon className="w-4" />}
            />
            <Input
                {...register("phone")}
                id="phone"
                autoComplete="on"
                errorMessage={errors.phone?.message}
                isInvalid={!!errors.phone}
                label="Phone"
                className="col-span-2"
                startContent={<PhoneIcon className="w-4" />}
            />
            <Input
                {...register("password")}
                id="password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
                label="Password"
                type={isVisiblePass ? "text" : "password"}
                className="col-span-2"
                startContent={<KeyIcon className="w-4" />}
                endContent={
                    isVisiblePass ?
                        <EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
                        :
                        <EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass} />
                }
            />
            <PasswordStrength passStrength={passStrength} />
            <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                errorMessage={errors.confirmPassword?.message}
                isInvalid={!!errors.confirmPassword}
                label="Confirm Password"
                type={isVisiblePass ? "text" : "password"}
                className="col-span-2"
                startContent={<KeyIcon className="w-4" />}
            />
            <Controller
                control={control}
                name="accepted"
                render={({ field }) => (
                    <Checkbox
                        name="checkbox"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="col-span-2"><span className=" text-white">I Accept The </span>
                        <Link href="/terms">Terms</Link>
                    </Checkbox>
                )}
            />
            {!!errors.accepted && <p className="text-red-500">{errors.accepted.message}</p>}
            <div className="flex justify-center col-span-2">
                <Button color="primary" type="submit" className="w-48">
                    Submit
                </Button>
            </div>
        </form>
    )
}
