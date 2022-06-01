<script context="module">
    import { newMarketToggle } from './sessionStore'
    import { shopList, newShopToggle, currentUser } from '$lib/sessionStore'

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
</script>


{#if $newMarketToggle}
    <button on:click={toggleNewMarket}>Go to market overview</button>
    <NewMarket/>    
{:else}
    <button on:click={toggleNewMarket}>Go to market creation</button>
    <Market/>
{/if}