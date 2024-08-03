import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
import { authOptions } from '../api/auth/[...nextauth]/route';


//price_1NarR3APMZcBliJSoefCKTi5

export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
    apiVersion: '2024-06-20',
});



export default async function Dashboard() {
    const session = await getServerSession(authOptions);

  return (
    <div className='max-w-4xl m-auto w-full px-4'>
      <div className='flex flex-col'>
        <p className='text-2xl font-medium'> 
            Welcome, {session?.user?.firstName}
        </p>
      </div>
    </div>
  )
}
