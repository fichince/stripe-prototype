import type { PageLoad } from './$types';
import { browser } from '$app/environment';
import { faker } from '@faker-js/faker';

export const load : PageLoad = async ({ fetch }) => {

  const testimonials = [];
  for (let i = 0; i < 3; i++) {
    testimonials.push({
      name: faker.name.fullName(),
      image: faker.image.avatar(),
      text: faker.lorem.paragraph(),
    });
  }

  if (!browser) return { testimonials };

  const response = await fetch('/create-payment-intent', {
    method: 'POST'
  });

  const { clientSecret } = await response.json();

  return {
    testimonials,
    clientSecret
  };
};