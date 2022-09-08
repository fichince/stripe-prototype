import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import stripe from 'stripe';

const client = new stripe.Stripe(env.STRIPE_API_KEY || '', { apiVersion: '2022-08-01' });

const DOMAIN = 'http://localhost:5173';

export const POST : RequestHandler = async (req) => {

  const session = await client.checkout.sessions.create({
    mode: 'subscription',
    cancel_url: `${DOMAIN}/cancel`,
    success_url: `${DOMAIN}/success`,
    line_items: [
      {
        price: 'price_1LZxY0F1SMIIdnkKQEhSywz2',
        quantity: 1,
      },
    ]
  });

  return Response.redirect(session.url || '', 303);
};