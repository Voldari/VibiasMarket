<script>
    import { getShopsWithMarketID } from '$lib/db'
    import Shops from '$lib/Shops.svelte';
    import { shopList, newShopToggle, currentMarket } from '$lib/sessionStore'

    import NewShop from './NewShop.svelte';

    function toggleNewShop() {
        newShopToggle.set(!$newShopToggle)
    }

</script>

{#await getShopsWithMarketID($currentMarket.id) then}
    <h2>{$currentMarket.market_name}</h2>

    {#if $newShopToggle}
        <button on:click={toggleNewShop}>View shops</button>
        <NewShop/>
    {:else}
        <button on:click={toggleNewShop}>Create new shop</button>
        <h2>Shops</h2>
        {#each $shopList as data}
            <Shops {...data}/>
        {/each}
    {/if}
{/await}