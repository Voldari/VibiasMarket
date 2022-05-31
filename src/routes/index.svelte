<script>
  import Auth from '$lib/Auth.svelte'
  import Landing from '$lib/Landing.svelte'
  import User from '$lib/User.svelte'
  import App from '$lib/App.svelte';

  import { user } from '$lib/db';
</script>

{#if $user}
  <User/>
  <App/>
{:else}
  <Landing/>
  <Auth/>
{/if}

<style>

</style>
