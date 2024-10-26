import Stripe from 'stripe';
import { authOptions } from "@/lib/authOptions";
import { createCheckoutLink, createCustomerIfNull, generateCustomerPortalLink, hasSubscription } from '@/lib/billing';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { StripePricingTable } from '@/lib/pricingTable';



export const stripe = new (Stripe as any)(String(process.env.STRIPE_SECRET), {
    apiVersion: '2024-06-20',
});

export default async function SubscriptionPage() {

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

                        <Link href={"" + checkout_link}>Purchase subscription
                        </Link>
                    </div>
            }

            {/* hasSub shown as false when attempting to subscribe by clicking on table products */}
            {/* <StripePricingTable /> */}

        </div>
    )
}

