"use client"

import Link from "next/link";
import LogoIcon from "@@/assets/logo.svg";
import DashboardMenu from "../components/DashboardMenu";
import DashboardNavbar from "../components/DashboardNavbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserType } from "@prisma/client";


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();

    // Feature to redirect user to sign-in page if session expires
    useEffect(() => {
        const checkSession = () => {
            if (!loading && !session) {
                router.push('/');
            }
        };

        // Initial check
        checkSession();

        // Check every 2 hours
        const interval = setInterval(checkSession, 120 * 60 * 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [loading, session, router]);


    // Destructure custom fields from User object
    const userType = session?.user?.userType as UserType;


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
                <DashboardNavbar />
                {children}
            </div>
        </div>
    )
}
