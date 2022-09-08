import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load : PageLoad = async ({ fetch }) => {

  if (!browser) return;

  const response = await fetch('/create-payment-intent', {
    method: 'POST'
  });

  const { clientSecret } = await response.json();

  return {
    clientSecret
  };
};