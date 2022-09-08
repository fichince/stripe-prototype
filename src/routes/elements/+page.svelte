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

  export let data : PageData;

  let elements : any;

  onMount(() => {
    const { clientSecret } = data;
    const stripe = Stripe(env.PUBLIC_STRIPE_KEY);

    const appearance = { theme: 'stripe' };
    elements = stripe.elements({ appearance, clientSecret });

    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  });
</script>

<div class="container">
  This is the embedded payment form

  <div class="form-container">
    <div id="payment-element"></div>
  </div>
</div>

<style>
  .container {
    padding: 50px;
  }

  .form-container {
    border: 1px solid black;
    padding: 20px;
    margin: 10px;
  }
</style>
