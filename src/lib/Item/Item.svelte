<script>
    import { currentItem, itemState } from "$lib/control/sessionStore";
</script>

<button on:click={() => itemState.set('list')}>change item</button>
<h2>{$currentItem.item_name}</h2>
<h3>{$currentItem.item_cost}</h3>