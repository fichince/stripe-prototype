<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="p-32">
  Here is the checkout:
  <form action="/do-checkout" method="post">
    <button class="btn" type="submit">
      Use Stripe Checkout
    </button>
  </form>

  <button class="btn" type="button" on:click={() => goto('/elements')}>
    Use Stripe Elements
  </button>
</div>
