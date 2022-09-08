import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import stripe from 'stripe';

const client = new stripe.Stripe(env.STRIPE_API_KEY || '', { apiVersion: '2022-08-01' });

const DOMAIN = 'http://localhost:5173';

export const POST : RequestHandler = async (req) => {

  const data = await req.request.formData();
  const price = (data.get('price') || '') as string;

  const session = await client.checkout.sessions.create({
    mode: 'subscription',
    cancel_url: `${DOMAIN}/`,
    success_url: `${DOMAIN}/success`,
    line_items: [
      {
        price,
        quantity: 1,
      },
    ]
  });

  return Response.redirect(session.url || '', 303);
};