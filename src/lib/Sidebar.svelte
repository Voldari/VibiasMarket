<script>
    import { marketState, currentMarket, currentUser, marketDeleteControl, marketPatonList, marketOwnerList } from '$lib/control/sessionStore'
    import { deleteMarket, deleteShopWithMarketID, getMarketsWithOwnerID, getMarketsWithPatronID } from '$lib/control/db'

    /**
    * @param {{ market_name: string; id: number; owner_id: number}} market
    */
    async function openMarket(market) {
        currentMarket.set(market)
        marketState.set('home')
    }

    /**
    * @param {{ market_name: string; id: number; owner_id: number}} market
    */
    async function closeMarket(market) {
        await deleteMarket(market.id)
        await deleteShopWithMarketID(market.id)
        getMarketsWithOwnerID($currentUser.int_id)
        getMarketsWithPatronID($currentUser.int_id)
    }

    /**
    * @param {{ market_name: string; id: number; owner_id: number}} market
    */
    async function leaveMarket(market) {
        await deleteMarket(market.id)
        await deleteShopWithMarketID(market.id)
        getMarketsWithOwnerID($currentUser.int_id)
        getMarketsWithPatronID($currentUser.int_id)
    }

</script>

<div class="container">
    <div class="control">
        <button on:click={() => marketState.set('create')}>Go to market creation</button>
        <button>Join a new Market</button>
    </div>

    <h2>Markets you own</h2>
    {#await getMarketsWithOwnerID($currentUser.int_id) then}
        {#each $marketOwnerList as market}
            {#if market.market_name != ''}
                <div class="market">
                    <h2>{market.market_name}</h2>
                    <button on:click={() => openMarket(market)}>Open</button>
                    <button on:click={() => closeMarket(market)}>Delete</button>
                </div>
            {/if}
        {/each}
    {/await}

    <h2>Markets you patron</h2>
    {#await getMarketsWithPatronID($currentUser.int_id) then}
        {#each $marketPatonList as market}
            <div class="market">
                <h2>{market.market_name}</h2>
                <button on:click={() => openMarket(market)}>Open</button>
                <button on:click={() => leaveMarket(market)}>Leave</button>
            </div>
        {/each}
    {/await}
</div>


<style>
    .container {
        max-width: 250px;
        background-color: mediumseagreen;
        grid-area: sidebar;
    }
    .market {
        width: 200px;
        height: 100px;
        border: solid;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }

    .control {
        width: calc(100% - 20px);
        margin: 10px;
        height: 50px;
        display: flex;
        gap: 10px;
    }
</style>