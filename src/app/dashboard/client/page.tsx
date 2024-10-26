import { authOptions } from "@/lib/authOptions";
import { getServerSession } from 'next-auth';
import { Link } from '@nextui-org/react';


export default async function ClientDashboard() {

    const session = await getServerSession(authOptions);

    return (
        <>
            <p className='flex flex-col'>Welcome {session?.user?.firstName}</p>
            <Link href="/dashboard/client/subscription">
                Visit Subscription Page
            </Link>
        </>
    )
}
