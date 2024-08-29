"use client"

import Link from "next/link";
import LogoIcon from "@@/assets/logo.svg";
import DashboardMenu from "../components/DashboardMenu";
import DashboardNavbar from "../components/DashboardNavbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex">
            <div className="w-1/6 md:w-32 lg:w-[16%] bg-[#5D2CA8]">
                <Link href="/" className="flex items-center justify-center lg:justify-start gap-2 p-4">
                    <LogoIcon className="h-8 w-8" />
                    <span className="hidden lg:block font-bold text-xl">Apothetory</span>
                </Link>
                <DashboardMenu />
            </div>
            <div className="w-5/6 overflow-scroll">
                <DashboardNavbar />
                {children}
            </div>
        </div>
    )
}
