import SignUpForm from "@/app/components/SignUpForm";
import { Link } from "@nextui-org/react";


export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-[1000px]">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center px-2 gap-3">
        <div className="md:col-span-2 flex justify-center items-center">
          <p className="text-center p-2">Already Signed up?</p>
          <Link href={"/auth/signin"}>Sign In</Link>
        </div>
        <SignUpForm />
        <picture>
          <img src="/assets/login.png" alt="Login Form" width={500} height={500} className="rounded-xl" />
        </picture>
      </div>
    </div>
  )
}
