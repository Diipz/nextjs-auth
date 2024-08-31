"use client"

import { useSession } from "next-auth/react";
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
        <h1>hello</h1>
    )
}
