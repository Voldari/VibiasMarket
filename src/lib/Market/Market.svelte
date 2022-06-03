<script>
    import { currentMarket, marketState } from '$lib/control/sessionStore'
    import ShopControl from '$lib/shop/ShopControl.svelte';


</script>

<button on:click={() => marketState.set('list')}>change market</button>
<h2>{$currentMarket.market_name}</h2>
<ShopControl/>