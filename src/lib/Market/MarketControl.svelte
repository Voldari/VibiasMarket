<script>
    import { marketState } from '$lib/control/sessionStore'

    import MarketNew from '$lib/Market/MarketNew.svelte';
    import Market from '$lib/Market/Market.svelte';
</script>

<div class="container">
    {#if $marketState == 'list'}
        hello
    {:else if $marketState == 'create'}
        <MarketNew/>
    {:else if $marketState == 'inventory'}
        inventory
    {:else}
        <Market/>
    {/if}
</div>

<style>
    .container {
        background-color: moccasin;
        grid-area: sidebar;
        border: solid;
        border-radius: 10px;
        height: calc(100% - 40px);
        margin: 20px;
        overflow: hidden;
    }
</style>