<script>
    import { shopState, shopList, currentShop, currentMarket, shopDeleteControl } from '$lib/control/sessionStore'
    import { deleteShop, getShopsWithMarketID } from '$lib/control/db'

    /**
    * @param {{ shop_name: string; market_id: number; ownerid: string; id: any; }} shop
    */
    async function openShop(shop) {
        if ($shopDeleteControl) {
            currentShop.set(shop)
            shopState.set('home')
        } else {
            await deleteShop(shop.id)
            getShopsWithMarketID($currentMarket.id)
        } 
    }
</script>


<button on:click={() => shopState.set('create')}>Go to shop creation</button>
<h2>Your shops</h2>

{#if $shopDeleteControl}
    Open mode
    <button on:click={() => shopDeleteControl.set(false)}>Delete Markets</button> 
{:else}
    Delete mode
    <button on:click={() => shopDeleteControl.set(true)}>Open Markets</button> 
{/if}

<div>
    {#await getShopsWithMarketID($currentMarket.id) then}
        {#each $shopList as shop}
            {#if shop.shop_name != ''}
                <button on:click={() => openShop(shop)}>{shop.shop_name}</button>
            {/if}
        {/each}
    {/await}
</div>