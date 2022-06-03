<script>
    import { currentUser } from '$lib/control/sessionStore'
    import { getCurrentUser } from '$lib/control/db'

    import MarketControl from '$lib/Market/MarketControl.svelte';
</script>

<div class="container">
    {#await getCurrentUser() then}
        <h1>Welcome {$currentUser.display_name}</h1>
        <MarketControl/>
    {/await}
</div>

<style>
    .container {
        margin: 2rem;
        background-color: springgreen;
    }
</style>