

import ClientSignUpForm from "@/app/components/ClientSignUpForm";
import { Link } from "@nextui-org/react";



export default function ClientSignUpPage() {

  return (
    <div className="flex justify-center items-center h-[1000px]">
      <div className="flex flex-col px-2 gap-3">
        <div className=" flex flex-col justify-center items-center">
          <div className="flex">
            <p className="text-center p-2">Already Signed up?</p>
            <Link href={"/auth/signin/client"}>Sign In</Link>
          </div>
        </div>
        <div className=" flex flex-col md:flex-row gap-2">
          <ClientSignUpForm />
          <picture className="max-h-full">
            <img src="/assets/login.png" alt="Login Form" width={500} className="rounded-xl h-full" />
          </picture>
        </div>
      </div>
    </div>
  )
}

