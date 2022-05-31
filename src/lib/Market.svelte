<script>
    import Shops from '$lib/Shops.svelte';

    import { getMarkets, getShopsWithMarketID } from '$lib/db'
    import { marketList } from '$lib/sessionStore'
    
    let selected_market = { market_name: "", id: 0};

</script>

<script context="module">
    getMarkets()
</script>

<!-- Select market from listed options -->
<select name="market" id="market" bind:value={selected_market}>
    {#each $marketList as market}
        <option value={market}>{market.market_name}</option>
    {/each}
</select>

<h1>{selected_market.market_name}</h1>

<!-- Show selected market data/shops -->
{#if selected_market != { market_name: "", id: 0}}
    {#await getShopsWithMarketID(selected_market.id)}
        <p>Fetching data...</p>
    {:then data}
        {#each data as shop}
            <Shops {...shop}/>
        {/each}
    {:catch error}
        <p>Something went wrong while fetching the data:</p>
        <pre>{error}</pre>
    {/await}
{/if}
