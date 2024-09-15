import ResetPasswordForm from "@/app/components/ResetPasswordForm"
import { verifyJwt } from "@/lib/jwt"

interface Props {
    params: {
        jwt: string
    }
}

export default function ResetPasswordPage({ params }: Props) {

    const payload = verifyJwt(params.jwt);
    const usertype = "associate"

    if (!payload) return <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        Your reset password link has expired!
    </div>

    return (
        <div className="flex justify-center">
            <ResetPasswordForm jwtUserId={params.jwt} usertype={usertype} />
        </div>
    )
}