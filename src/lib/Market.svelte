<script>
    import { getShopsWithMarketID } from '$lib/db'
    import Shops from '$lib/Shops.svelte';
    import { shopList, newShopToggle, currentMarket } from '$lib/sessionStore'

    import NewShop from './NewShop.svelte';

    $: getShopsWithMarketID($currentMarket.id)

    function toggleNewShop() {
        newShopToggle.set(!$newShopToggle)
    }

</script>


<h1>{$currentMarket.market_name}</h1>

{#if $newShopToggle}
    <button on:click={toggleNewShop}>View shops</button>
    <NewShop/>
{:else}
    <button on:click={toggleNewShop}>Create new shop</button>
    {#each $shopList as data}
        <Shops {...data}/>
    {/each}
{/if}

