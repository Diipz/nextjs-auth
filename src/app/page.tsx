import { sendMail } from "@/lib/mail";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Link } from "@nextui-org/react";

export default async function Home() {

  /* await sendMail({
    to:"dip_patel100@hotmail.com", 
    subject:"test", 
    body:"hello world"
  }); */
<<<<<<< HEAD
=======
  const session = await getServerSession(authOptions);

  //if user logged in display Link button to go to dashboard
  if (session) return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/dashboard" className="flex justify-center items-center">Dashboard</Link>
    </main>
  )

>>>>>>> stripe

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
