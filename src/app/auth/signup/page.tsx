import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";
import nextImage from "next/image";


export default function SignUpPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center m-2 gap-3 h-[1000px]">

      <div className="md:col-span-2 flex justify-center items-center">
        <p className="text-center p-2">Already Signed up?</p>
        <Link href={"/auth/signin"}>Sign In</Link>
      </div>
      <SignUpForm />
      <picture>
        <Image as={nextImage} src="/assets/login.png" alt="Login Form" width={500} height={500} priority={true} />

      </picture>
    </div>
  )
}
