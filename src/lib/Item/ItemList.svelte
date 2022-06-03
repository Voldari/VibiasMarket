<script>
    import { itemState, itemList, currentShop, currentItem, itemDeleteControl } from '$lib/control/sessionStore'
    import { deleteItem, getItemsWithShopID } from '$lib/control/db'


    /**
    * @param {any} item
    */
    async function openItem(item) {
        if ($itemDeleteControl) {
            currentItem.set(item)
            itemState.set('home')
        } else {
            await deleteItem(item.id)
            getItemsWithShopID($currentShop.id)
        } 
    }
</script>


<button on:click={() => itemState.set('create')}>Go to item creation</button>
<h2>Your items</h2>

{#if $itemDeleteControl}
    Open mode
    <button on:click={() => itemDeleteControl.set(false)}>Delete Items</button> 
{:else}
    Delete mode
    <button on:click={() => itemDeleteControl.set(true)}>Open Items</button> 
{/if}

<div>
    {#await getItemsWithShopID($currentShop.id) then}
        {#each $itemList as item}
            {#if item.item_name != ''}
                <button on:click={() => openItem(item)}>{item.item_name}</button>
            {/if}
        {/each}
    {/await}
</div>