"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ValidSession() {

    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();

    useEffect(() => {
        if (!loading && !session) {
            router.push('/api/auth/signin'); // Redirect to sign-in page
        }
    }, [loading, session]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/dashboard" className="flex justify-center items-center text-sky-500">Dashboard</Link>
        </main>
    )
}
