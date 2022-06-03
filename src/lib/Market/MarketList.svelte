<script>
    import { marketState, marketList, currentMarket, currentUser, marketDeleteControl } from '$lib/control/sessionStore'
    import { deleteMarket, deleteShopWithMarketID, getMarketsFromUser } from '$lib/control/db'

    /**
    * @param {{ market_name: string; id: number; ownerid: string; }} market
    */
    async function openMarket(market) {
        if ($marketDeleteControl) {
            currentMarket.set(market)
            marketState.set('home')
        } else {
            await deleteMarket(market.id)
            await deleteShopWithMarketID(market.id)
            getMarketsFromUser($currentUser.id)
        } 
    }
</script>


<button on:click={() => marketState.set('create')}>Go to market creation</button>
<h2>Your markets</h2>

{#if $marketDeleteControl}
    Open mode
    <button on:click={() => marketDeleteControl.set(false)}>Delete Markets</button> 
{:else}
    Delete mode
    <button on:click={() => marketDeleteControl.set(true)}>Open Markets</button> 
{/if}

<div>
    {#await getMarketsFromUser($currentUser.id) then}
        {#each $marketList as market}
            {#if market.market_name != ''}
                <button on:click={() => openMarket(market)}>{market.market_name}</button>
            {/if}
        {/each}
    {/await}
</div>