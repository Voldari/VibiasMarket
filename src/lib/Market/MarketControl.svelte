<script>
    import { marketState } from '$lib/control/sessionStore'

    import MarketList from '$lib/Market/MarketList.svelte';
    import MarketNew from '$lib/Market/MarketNew.svelte';
    import Market from '$lib/Market/Market.svelte';
</script>

<div class="container">
    {#if $marketState == 'list'}
        <MarketList/>
    {:else if $marketState == 'create'}
        <MarketNew/>
    {:else}
        <Market/>
    {/if}
</div>

<style>
    .container {
        margin: 2rem;
        background-color: moccasin;
    }
</style>