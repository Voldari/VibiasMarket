<script>
    import { currentUser, currentMarket, marketState, marketList } from '$lib/sessionStore'
    import { getCurrentUser, getMarketsFromUser, } from '$lib/db'

    import Market from "./Market.svelte";
    import NewMarket from "./NewMarket.svelte";


    /**
    * @param {string} state
    */
    function toggleMarketChange(state) {
        marketState.set(state)
    }
    /**
    * @param {{ market_name: string; id: string; ownerid: string; }} market
    */
    function openMarket(market) {
        currentMarket.set(market)
        toggleMarketChange('home')
    }
</script>

{#await getCurrentUser()}
    awaiting User data
{:then}
    {#await getMarketsFromUser($currentUser.id)}
        awaiting market data
    {:then}
        {#if $marketState == 'list'}
            <button on:click={() => toggleMarketChange('create')}>Go to market creation</button>
            <h2>Your markets</h2>
            {#each $marketList as market}
                {#if market.market_name != ''}
                    <button on:click={() => openMarket(market)}>{market.market_name}</button>
                {/if}
            {/each}
        {:else if $marketState == 'create'}
            <button on:click={() => toggleMarketChange('list')}>change market</button>
            <NewMarket/>
        {:else}
            <button on:click={() => toggleMarketChange('list')}>change market</button>
            <Market/>
        {/if}
    {/await}
{/await}

