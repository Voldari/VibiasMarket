<script>
    import { getCurrentUser } from '$lib/control/db'

    import MarketControl from '$lib/Market/MarketControl.svelte';
</script>

<div class="container">
    {#await getCurrentUser() then}
        <MarketControl/>
    {/await}
</div>


<style>
    .container {
        grid-area: main;
    }
</style>