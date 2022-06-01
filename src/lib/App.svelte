<script context="module">
    import { currentMarket, newMarketToggle } from './sessionStore'
    import { currentUser, marketState, marketList } from '$lib/sessionStore'

    import { getCurrentUser, getMarketsFromUser, } from '$lib/db'
    getCurrentUser()
</script>


<script>
    $: getMarketsFromUser($currentUser.id)

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
    * @param {{ market_name: string; id: string; ownerid: string; }} market
    */
    function openMarket(market) {
        currentMarket.set(market)
        toggleMarketChange('home')
    }
</script>

{#if $marketState == 'list'}
    <button on:click={() => toggleMarketChange('create')}>Go to market creation</button>
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