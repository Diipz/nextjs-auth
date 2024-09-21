"use client"

import Link from "next/link";
import { HomeIcon, CalendarIcon, ClipboardDocumentListIcon, MegaphoneIcon, CreditCardIcon, ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, UserIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from 'next-auth/react';
import { UserType } from "@prisma/client";
import { useRouter } from "next/navigation";


export default function DashboardMenu({ userType }: { userType: UserType }) {

    const router = useRouter();

    const menuItems = [
        {
            title: "MENU",
            items: [
                {
                    icon: <HomeIcon className="h-6 w-6" />,
                    label: "Home",
                    href: `/dashboard/${userType}`,
                    visible: ["client", "associate"],
                },
                {
                    icon: <CalendarIcon className="h-6 w-6" />,
                    label: "Calendar",
                    href: `/dashboard/${userType}/calendar`,
                    visible: ["client", "associate"],
                },
                {
                    icon: <MegaphoneIcon className="h-6 w-6" />,
                    label: "Job Posts",
                    href: `/dashboard/client/jobposts`,
                    visible: ["client"],
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
                    icon: <InformationCircleIcon className="h-6 w-6" />,
                    label: "Guide",
                    href: `/dashboard/${userType}/guide`,
                    visible: ["client", "associate"],
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


    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await signOut({ callbackUrl: `/auth/signin/${userType}` });
    }

    return (
        <div className="mt-4 p-4 text-sm">
            {menuItems.map((section) => (
                <div key={section.title} className="flex flex-col gap-2">
                    <span className="hidden lg:block font-bold my-4">{section.title}</span>

                    {section.items
                        .filter(item => item.visible.includes(userType))
                        .map(item => (
                            item.label !== "Logout" ? (
                                <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 py-2">
                                    {item.icon}
                                    <span className="hidden lg:block my-4">{item.label}</span>
                                </Link>
                            ) : (
                                <button key={item.label} onClick={(e) => handleSignOut(e)} className="flex items-center justify-center lg:justify-start gap-4 py-2">
                                    {item.icon}
                                    <span className="hidden lg:block my-4">{item.label}</span>
                                </button>
                            )
                        ))}
                </div>
            ))}
        </div>
    );
}




