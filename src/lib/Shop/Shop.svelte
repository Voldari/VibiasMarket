<script>
    import { currentShop, shopState } from "$lib/control/sessionStore";
import ItemControl from "$lib/Item/ItemControl.svelte";
</script>

<button on:click={() => shopState.set('list')}>change shop</button>
<h2>{$currentShop.shop_name}</h2>

<ItemControl/>
