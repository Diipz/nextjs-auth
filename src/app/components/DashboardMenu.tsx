"use client"

import Link from "next/link";
import { HomeIcon, CalendarIcon, EnvelopeIcon, ClipboardDocumentListIcon, CreditCardIcon, ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, UserIcon } from "@heroicons/react/24/outline";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <HomeIcon className="h-6 w-6" />,
                label: "Home",
                href: "/",
                visible: ["client", "associate"],
            },
            {
                icon: <CalendarIcon className="h-6 w-6" />,
                label: "Calendar",
                href: "/",
                visible: ["client", "associate"],
            },
            {
                icon: <EnvelopeIcon className="h-6 w-6" />,
                label: "Messages",
                href: "/",
                visible: ["client", "associate"],
            },
            {
                icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
                label: "Credentials",
                href: "/",
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
                href: "/profile",
                visible: ["associate"],
            },
            {
                icon: <BuildingOffice2Icon className="h-6 w-6" />,
                label: "Organisation",
                href: "/organisation",
                visible: ["client"],
            },
            {
                icon: <CreditCardIcon className="h-6 w-6" />,
                label: "Subscription",
                href: "/settings",
                visible: ["client"],
            },
            {
                icon: <ArrowRightStartOnRectangleIcon className="h-6 w-6" />,
                label: "Logout",
                href: "/logout",
                visible: ["client", "associate"],
            },
        ],
    },
];

export default function DashboardMenu() {
    return (
        <div className="mt-4 p-4 text-sm">
            {menuItems.map(i => (
                <div key={i.title} className="flex flex-col gap-2">
                    <span className="hidden lg:block font-bold my-4">{i.title}</span>
                    {i.items.map(item => (
                        <Link href={item.href} key={item.label} className="flex items-center justify-center lg:justify-start gap-4 py-2">
                            {item.icon}
                            <span className="hidden lg:block my-4">{item.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}




