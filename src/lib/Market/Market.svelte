<script>
import { getShopsWithMarketID } from '$lib/control/db';

    import { currentMarket, currentUser, shopList } from '$lib/control/sessionStore'
    import Shop from '$lib/Shop.svelte';


</script>

<div class="head">
    <h2>Welcome to <span class="market">{$currentMarket.market_name}</span></h2>
    {#if $currentMarket.owner_id == $currentUser.int_id}
        You own this
    {:else}
        You dont own this
    {/if}

    <div>
        Your Gold: 45gp
    </div>

    <button>Create new shop</button>
    <button>Open Inventory</button>
</div>

{#await getShopsWithMarketID($currentMarket.id) then}
    <div class="container">
        {#each $shopList as shop}
            {#if shop.shop_name != ''}
                <Shop {shop}/>
            {/if}
        {/each}
    </div>
{/await}


<style>
    .head {
        background-color: palevioletred;
        padding: 20px;
    }
    .market {
        color: teal;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
    }
</style>