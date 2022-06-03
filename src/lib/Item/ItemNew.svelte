<script>
    import { createNewItem } from '$lib/control/db'
    import { currentMarket, currentUser, itemState, currentShop } from '$lib/control/sessionStore'

    let newItemName = ""

    async function createItemandToggle() {
        await createNewItem(newItemName, $currentShop.id, $currentMarket.id, $currentUser.id)
        itemState.set('home')
    }

</script>

<button on:click={() => itemState.set('list')}>View items</button>
<h2>Item creation</h2>
<button on:click={createItemandToggle}>Create new Item</button>
<input type="text" bind:value={newItemName}>