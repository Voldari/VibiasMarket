<script>
    import { itemState } from '$lib/control/sessionStore'

    import ItemList from '$lib/Item/ItemList.svelte';
    import Item from '$lib/Item/Item.svelte';
    import ItemNew from '$lib/Item/ItemNew.svelte';

    itemState.set('list')
</script>


<div class="container">
    {#if $itemState == 'list'}
        <ItemList/>
    {:else if $itemState == 'create'}
        <ItemNew/>
    {:else}
        <Item/>
    {/if}
</div>

<style>
    .container {
        margin: 2rem;
        background-color: thistle;
    }
</style>