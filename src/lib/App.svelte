<script context="module">
    import { currentMarket, newMarketToggle } from './sessionStore'
    import { shopList, newShopToggle, currentUser, marketState, marketList } from '$lib/sessionStore'

    import { getCurrentUser, getMarkets, getShops } from '$lib/db'

    getMarkets()
    getCurrentUser()
</script>


<script>
    import Market from "./Market.svelte";
    import NewMarket from "./NewMarket.svelte";

    let shop = true
    function toggleNewMarket() {
        newMarketToggle.set(!$newMarketToggle)
    }

    /**
    * @param {string} state
    */
    function toggleMarketChange(state) {
        marketState.set(state)
    }

    /**
    * @param {{ market_name: string; id: number; ownerid: string; }} market
    */
    function openMarket(market) {
        currentMarket.set(market)
        toggleMarketChange('home')
    }
</script>

{#if $marketState == 'list'}
    <button on:click={() => toggleMarketChange('create')}>Go to market creation</button>
    {#each $marketList as market}
        <button on:click={() => openMarket(market)}>{market.market_name}</button>
    {/each}
{:else if $marketState == 'create'}
    <button on:click={() => toggleMarketChange('list')}>change market</button>
    <NewMarket/>
{:else}
    <button on:click={() => toggleMarketChange('list')}>change market</button>
    <Market/>
{/if}