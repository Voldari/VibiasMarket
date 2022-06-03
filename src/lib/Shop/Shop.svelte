<script>
    import { currentShop, shopState } from "$lib/control/sessionStore";
</script>

<button on:click={() => shopState.set('list')}>change shop</button>
<h2>{$currentShop.shop_name}</h2>
