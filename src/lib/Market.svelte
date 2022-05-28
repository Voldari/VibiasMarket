<script>
    import markets from "$lib/data/markets.json"
    let selected_market = { market_name: "", id: 0};

    import { supabase } from '$lib/db'

    async function getMarkets() {
        const { data, error } = await supabase
            .from('Markets')
            .select('id, market_name')  
        if (error) throw new Error(error.message)
    
        return data
    }

    async function getShops() {
        const { data, error } = await supabase
            .from('Shops')
            .select('shop_name, market_id')
        if (error) throw new Error(error.message)
    
        return data
    }


</script>


{#await getMarkets()}
    <p>Fetching data...</p>
{:then data}
    <select name="market" id="market" bind:value={selected_market}>
        {#each data as market}
            <option value={market}>{market.market_name}</option>
        {/each}
    </select>

    <h1>{selected_market.market_name}</h1>

    {#if selected_market != { market_name: "", id: 0}}
        {#await getShops()}
            <p>Fetching data...</p>
        {:then data}
            {#each data as shop}
                {#if selected_market.id == shop.market_id}
                    {shop.shop_name}
                {/if}  
            {/each}
        {:catch error}
            <p>Something went wrong while fetching the data:</p>
            <pre>{error}</pre>
        {/await}
    {/if}

{:catch error}
    <p>Something went wrong while fetching the data:</p>
    <pre>{error}</pre>
{/await}


