
<script>

import { supabase, user, auth } from '$lib/db';


async function getData() {
  const { data, error } = await supabase
    .from('products')
    .select()  
    
    if (error) throw new Error(error.message)
  
  return data
}

</script>

{#await getData()}
  <p>Fetching data...</p>
{:then data}
  {#each data as game}
    <li>{game.length}</li>
  {/each}
{:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await}


  {#if $user}
    <p>You are signed in as {$user.email}</p>
    <button on:click={() => auth.signOut()}>Sign out</button>
  {:else}
    <nav>
      <a href="/sign-in">Sign in</a>
    </nav>
  {/if}

<div class="container">
    <div class="header">
        <h1>Vibia's Market</h1>
    </div>
    
    <div class="body">
        <h2>Create your own virtual market</h2>
        <a href="/signup">Sign Up</a>
    </div>
</div>

<style>

</style>
