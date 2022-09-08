<script lang="ts">
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

  export const data : PageData = {};

  let price : string;

</script>

<main class="p-28">

  <section class="card card-body p-16 bg-gray-100">

    <h1 class="text-center text-xl mb-5">Stripe Checkout</h1>

    <form action="/do-checkout" method="post" class="w-full" enctype="application/x-www-form-urlencoded">
      <div class="flex w-full justify-around">
        <input type="hidden" id="price" name="price" bind:value={price} />

        <input class="btn" type="submit" value="Pay upfront and save $117" 
          on:click={() => price = 'price_1LXoIXF1SMIIdnkKhSgp2vkw'}
        />
        <input class="btn" type="submit" value="Split payment over 3 months" 
          on:click={() => price = 'price_1LZxY0F1SMIIdnkKQEhSywz2'}
        />
      </div>
    </form>
  </section>

  <section class="card card-body p-16 bg-gray-100 mt-5">
    <h1 class="text-center text-xl mb-5">Stripe Elements</h1>

    <button class="btn" type="button" on:click={() => goto('/elements')}>
      Use Stripe Elements
    </button>
  </section>
</main>
