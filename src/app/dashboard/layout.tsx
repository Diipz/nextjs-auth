import Link from "next/link";
import LogoIcon from "@@/assets/logo.svg";
import DashboardMenu from "../components/DashboardMenu";
import DashboardNavbar from "../components/DashboardNavbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserType } from "@prisma/client";
import { redirect } from "next/navigation";

// Server Component
export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Fetch the session server-side
    const session = await getServerSession(authOptions);

    // Check for session and redirect if needed
    if (!session || !session.user) {
        redirect("/");
    }

    const user = session.user;

    // Destructure custom fields from User object
    const userType = session.user.userType as UserType;
    const firstName = session.user.firstName ?? '';
    const lastName = session.user.lastName ?? '';

    return (
        <div className="h-screen flex">
            <div className="w-1/6 md:w-32 lg:w-[16%] bg-[#5D2CA8]">
                <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 p-4">
                    <LogoIcon className="h-8 w-8" />
                    <span className="hidden lg:block font-bold text-xl">Apothetory</span>
                </Link>
                <DashboardMenu userType={userType} />
            </div>
            <div className="w-5/6 overflow-scroll">
                <DashboardNavbar userType={userType} firstName={firstName} lastName={lastName} />
                {children}
            </div>
        </div>
    );
}
