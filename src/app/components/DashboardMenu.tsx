"use client"

import Link from "next/link";
import { HomeIcon, CalendarIcon, EnvelopeIcon, ClipboardDocumentListIcon, CreditCardIcon, ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, UserIcon } from "@heroicons/react/24/outline";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const menuItems = [

    //add template strings to make hrefs below dynamic to client/associate
    {
        title: "MENU",
        items: [
            {
                icon: <HomeIcon className="h-6 w-6" />,
                label: "Home",
                href: "/dashboard",
                visible: ["client", "associate"],
            },
            {
                icon: <CalendarIcon className="h-6 w-6" />,
                label: "Calendar",
                href: "/dashboard/calendar",
                visible: ["client", "associate"],
            },
            {
                icon: <EnvelopeIcon className="h-6 w-6" />,
                label: "Messages",
                href: "/dashboard/messages",
                visible: ["client", "associate"],
            },
            {
                icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
                label: "Credentials",
                href: "/dashboard/associate/credentials",
                visible: ["associate"],
            }
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: <UserIcon className="h-6 w-6" />,
                label: "Profile",
                href: "/dashboard/associate/profile",
                visible: ["associate"],
            },
            {
                icon: <BuildingOffice2Icon className="h-6 w-6" />,
                label: "Organisation",
                href: "/dashboard/client/organisation",
                visible: ["client"],
            },
            {
                icon: <CreditCardIcon className="h-6 w-6" />,
                label: "Subscription",
                href: "/dashboard/client/subscription",
                visible: ["client"],
            },
            {
                icon: <ArrowRightStartOnRectangleIcon className="h-6 w-6" />,
                label: "Logout",
                href: "/",
                visible: ["client", "associate"],
            },
        ],
    },
];

export default function DashboardMenu() {

    const router = useRouter();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await signOut({ redirect: false });
        router.push("/auth/signin");
    }

    return (
        <div className="mt-4 p-4 text-sm">
            {menuItems.map(i => (
                <div key={i.title} className="flex flex-col gap-2">
                    <span className="hidden lg:block font-bold my-4">{i.title}</span>
                    {i.items.map(item => (
                        item.label !== "Logout" ? (
                            <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 py-2" >
                                {item.icon}
                                <span className="hidden lg:block my-4" > {item.label}</span>
                            </Link>
                        ) : (
                            <button key={item.label} onClick={(e) => handleSignOut(e)} className="flex items-center justify-center lg:justify-start gap-4 py-2" >
                                {item.icon}
                                <span className="hidden lg:block my-4" > {item.label}</span>
                            </button>
                        )

                    ))}
                </div >
            ))}
        </div >
    )
}




