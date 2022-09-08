import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import stripe from 'stripe';

const client = new stripe.Stripe(env.STRIPE_API_KEY || '', { apiVersion: '2022-08-01' });

const DOMAIN = 'http://localhost:5173';

export const POST : RequestHandler = async (req) => {

  const paymentIntent = await client.paymentIntents.create({
    amount: 100,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    }
  });

  return new Response(JSON.stringify({
    clientSecret: paymentIntent.client_secret
  }), {
    status: 200,
    headers: { 'Content-type': 'application/json' }
  });
};