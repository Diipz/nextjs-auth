import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
    searchParams: {
        callbackUrl?: string;
    }
}

export default function SignInPage({ searchParams }: Props) {

    return (
        <div className="flex items-center justify-center flex-col m-2">
        <SignInForm callbackUrl={searchParams.callbackUrl} />
            <Link href={"/auth/forgotPassword"}>Forgot your password?</Link>
        </div>
    )
}