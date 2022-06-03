<script>
    import { getShopsWithMarketID } from '$lib/control/db'
    import { currentMarket, shopState } from '$lib/control/sessionStore'

    import ShopList from '$lib/Shop/ShopList.svelte';
    import ShopNew from '$lib/Shop/ShopNew.svelte';
    import Shop from '$lib/Shop/Shop.svelte';

    shopState.set('list')
</script>


<div class="container">
    {#if $shopState == 'list'}
        <ShopList/>
    {:else if $shopState == 'create'}
        <ShopNew/>
    {:else}
        <Shop/>
    {/if}
</div>

<style>
    .container {
        margin: 2rem;
        background-color: aliceblue;
    }
</style>