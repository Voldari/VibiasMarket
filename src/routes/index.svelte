<script>
  import Auth from '$lib/Auth.svelte'
  import Landing from '$lib/Landing.svelte'
  import User from '$lib/User.svelte'
  import App from '$lib/App.svelte';

  import { user } from '$lib/control/db';
  import FrontEnd from '$lib/FrontEnd.svelte';
  import Sidebar from '$lib/Sidebar.svelte';
</script>

{#if $user}
  <div class="container">
    <User/>
    <App/>
    <Sidebar/>
  </div>
{:else}
  <Landing/>
  <Auth/>
{/if}

<style>
  .container {
    height: 100vh;
    display: grid; 
    grid-template-columns: 0fr 1fr; 
    grid-template-rows: 0fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
      "header header"
      "sidebar main"; 
  }
</style>

