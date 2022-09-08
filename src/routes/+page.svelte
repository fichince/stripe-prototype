<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="container">
  Here is the checkout:
  <form action="/do-checkout" method="post">
    <button type="submit">
      Use Stripe Checkout
    </button>
  </form>

  <button type="button" on:click={() => goto('/elements')}>
    Use Stripe Elements
  </button>
</div>

<style>
  .container {
    padding: 10px;
  }
</style>