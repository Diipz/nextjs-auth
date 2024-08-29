import Stripe from 'stripe';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/lib/billing';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { StripePricingTable } from '@/lib/pricingTable';




export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2024-06-20',
});


export default async function Dashboard() {

    const session = await getServerSession(authOptions);
    await createCustomerIfNull();

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    });

    const manage_link = await generateCustomerPortalLink("" + user?.stripe_customer_id);
    const hasSub = await hasSubscription();
    const checkout_link = await createCheckoutLink("" + user?.stripe_customer_id);

    return (
        <div className='max-w-4xl m-auto w-full px-4'>
            <p className='flex flex-col'>Welcome {session?.user?.firstName}</p>
            <div>
                <Link href={"" + manage_link}>
                    Manage billing
                </Link>
            </div>
            {
                hasSub ?
                    <div>
                        yes
                    </div>
                    :
                    <div>
                        no
                        <br />

                        <Link href={"" + checkout_link}>Purchase subsription
                        </Link>
                    </div>
            }

            <StripePricingTable />

        </div>
    )
}
