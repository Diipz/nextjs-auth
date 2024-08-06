import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ValidSession from "./components/ValidSession";

export default async function Home() {


  const session = await getServerSession(authOptions);

  //if user logged in display Link button to go to dashboard
  if (session) return (
    <ValidSession />
  )


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    </main>
  );
}
