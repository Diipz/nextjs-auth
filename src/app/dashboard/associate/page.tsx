import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function AssociateDashboard() {

    const session = await getServerSession(authOptions);

    return (
        <p className='flex flex-col'>Welcome {session?.user?.firstName}</p>
    )
}
