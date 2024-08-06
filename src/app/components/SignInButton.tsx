"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function SignInButton() {
    //useSession for client components or getServerSession for server components
    const { data: session, status } = useSession();

    const router = useRouter();
    const pathname = usePathname();

    const activationPage = pathname.includes("/auth/activation");


    //***TODO design loader
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex items-center gap-2">
            {session && session.user ? (
                <>
                    <Link
                        href={"/profile"}
                    >{`${session.user.firstName} ${session.user.lastName}`}</Link>
                    <Link
                        className="text-sky-500 hover:text-sky-600 transition-colors"
                        href={"/api/auth/signout"}
                    >
                        Sign Out
                    </Link>
                </>
            ) : (
                <>
                    <Button
                        onClick={() => {
                            if (activationPage) {
                                router.push("/auth/signin");
                            } else {
                                signIn();
                            }
                        }}
                    >
                        Sign In
                    </Button>
                    <Button as={Link} href={"/auth/signup"}>
                        Sign Up
                    </Button>
                </>
            )}
        </div>
    );
}