import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { AccountActivated } from '@prisma/client';

export default async function Messages() {

    const session = await getServerSession(authOptions);

    const user = await prisma.associate.findFirst({
        where: {
            email: session?.user?.email
        }
    });

    if (user?.accountActivated === AccountActivated.no) {

        return (
            <div>
                You do not have access to this feature until your account is approved
            </div>
        )
    }

    return (
        <div>
            You have access to messages
        </div>
    )
}
