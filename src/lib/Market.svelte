<script>
    import { getMarkets, getShopsWithMarketID } from '$lib/db'
    import Shops from '$lib/Shops.svelte';
    import { marketList, shopList, newShopToggle, currentMarket } from '$lib/sessionStore'
    import App from './App.svelte';
    import Auth from './Auth.svelte';
    import NewShop from './NewShop.svelte';
    
    let selected_market = { market_name: "", id: 0};

    $: getShopsWithMarketID($currentMarket.id)

    function toggleNewShop() {
        newShopToggle.set(!$newShopToggle)
    }

</script>

{$currentMarket.ownerid}

<!-- Select market from listed options -->
<select name="market" id="market" bind:value={$currentMarket}>
    {#each $marketList as market}
        <option value={market}>{market.market_name}</option>
    {/each}
</select>

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

