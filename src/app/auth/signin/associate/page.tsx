import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
    searchParams: {
        callbackUrl?: string;
    }
}

export default function SignInPage({ searchParams }: Props) {

    return (
        <div className="flex items-center justify-center flex-col m-2 h-full">
            <SignInForm callbackUrl={searchParams.callbackUrl} loginType={"associate"} />
            <Link href={"/auth/forgotPassword/associate"}>Forgot your password?</Link>
        </div>
    )
}