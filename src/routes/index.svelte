<script>
  import Auth from '$lib/Auth.svelte'
  import Landing from '$lib/Landing.svelte'
  import User from '$lib/User.svelte'
  import Market from '$lib/Market.svelte'

  import { user } from '$lib/db';
</script>


{#if $user}
  <User/>
  <Market/>
{:else}
  <Landing/>
  <Auth/>
{/if}

<style>

</style>
