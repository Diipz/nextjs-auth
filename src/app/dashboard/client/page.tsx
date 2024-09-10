import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
