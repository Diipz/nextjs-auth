import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
    searchParams: {
        callbackUrl?: string;
    }
    params: {
        usertype: string
    }
}

export default function SignInPage({ searchParams, params }: Props) {

    return (
        <div className="flex items-center justify-center flex-col m-2 h-full">
            <SignInForm callbackUrl={searchParams.callbackUrl} loginType={params.usertype} />
            <Link href={`/auth/forgotPassword/${params.usertype}`}>Forgot your password?</Link>
        </div>
    )
}
