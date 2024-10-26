import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Stripe from "stripe";
import prisma from "@/lib/prisma";



export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2024-06-20',
});

export async function hasSubscription() {
    const session = await getServerSession(authOptions);

    if (session) {
        const user = await prisma.user.findFirst({ where: { email: session.user?.email } });

        const subscriptions = await stripe.subscriptions.list({
            customer: String(user?.stripe_customer_id)
        })
        return subscriptions.data.length > 0;
    }

    return false;
}

export async function createCheckoutLink(customer: string) {


    const checkout = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXTAUTH_URL}/dashboard/client`,
        cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/client`,
        customer: customer,
        line_items: [
            {
                price: 'price_1Pk2OgCDJeDXo2JOa29O2jXN',
                quantity: 1
            }
        ],
        mode: "subscription"
    })

    return checkout.url;
}

export async function generateCustomerPortalLink(customerId: string) {


    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.NEXTAUTH_URL + "/dashboard/client", 
        });

        return portalSession.url;
    } catch (error) {
        console.log(error)
        return undefined;
    }
}

export async function createCustomerIfNull() {
    const session = await getServerSession(authOptions);

    if (session) {
        const user = await prisma.user.findFirst({ where: { email: session.user?.email } });
        

        if (!user?.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: String(user?.email)
            })

            await prisma.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    stripe_customer_id: customer.id
                }
            })
        }
        const user2 = await prisma.user.findFirst({ where: { email: session.user?.email } });
        return user2?.stripe_customer_id;
    }
}
