<svelte:head>
  <script src="https://js.stripe.com/v3/"></script>
</svelte:head>

<script context="module" lang="ts">
  declare var Stripe : any;
</script>

<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';
  import { fade } from 'svelte/transition';

  export let data : PageData;

  let elements : any;

  let product : string = 'upfront';
  let total : number;

  $: total = product === 'upfront' ? 117 : 150;
  $: ({ testimonials } = data );

  onMount(() => {
    const { clientSecret } = data;
    const stripe = Stripe(env.PUBLIC_STRIPE_KEY);

    const appearance = { theme: 'stripe' };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  });
</script>

<main class="p-28">
  <form>
    <h1 class="font-bold text-xl mb-3">Select the product</h1>
    <div class="flex w-full items-stretch">
      <section class="flex-shrink">

        <div class="border rounded-sm p-5 mb-3">
          <div class="form-control">
            <label class="label cursor-pointer justify-start">
              <input type="radio" name="product" class="radio mr-2" bind:group={product} value="upfront" />
              <span class="label-text">Pay upfront and save $117</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label cursor-pointer justify-start">
              <input type="radio" name="product" class="radio mr-2" bind:group={product} value="split" />
              <span class="label-text">Split payment over 3 months</span>
            </label>
          </div>

          <h2 class="font-bold text-lg my-3">Your total:</h2>
          {#key total}
            <span class="text-2xl" in:fade>${total}</span>
          {/key}
        </div>
      </section>

      <section class="flex-grow">
        <div class="border rounded-sm p-5">
          <div id="payment-element"></div>
        </div>
      </section>

    </div>
    <div class="flex w-full justify-center mt-3">
      <button class="btn">Pay now</button>
    </div>
  </form>

  <section class="border rounded-sm p-5 bg-gray-50 w-full mt-10">
    <h1 class="font-bold text-lg">Testimonials</h1>

    <div class="flex">
      {#each testimonials as t}
      <div class="card card-bordered border rounded-xl bg-gray-300 p-5 m-5">
        <figure>
          <div class="avatar">
            <div class="rounded-full">
              <img src={t.image} alt={t.name} />
            </div>
          </div>
        </figure>
        <div class="card-body">
          <div class="card-title">{t.name}</div>
          {t.text}
        </div>
      </div>
      {/each}
    </div>
  </section>


</main>