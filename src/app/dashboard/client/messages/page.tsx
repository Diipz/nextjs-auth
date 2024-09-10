import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { Link } from '@nextui-org/react';
import { getServerSession } from 'next-auth';

export default async function MessagesPage() {

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findFirst({
        where: { email: session?.user.email }
    });

    return (
        <div>
            {user?.stripe_customer_id ? (
                <div>You have access to messages</div>
            ) : (
                <>
                    <div>You do not have access to messages</div>
                    <Link href="/dashboard/client/subscription">
                        Visit Subscription Page
                    </Link>
                </>
            )}
        </div>
    );
}
