<script>
    import { createNewShop } from '$lib/control/db'
    import { currentMarket, currentUser, shopState } from '$lib/control/sessionStore'

    let newShopName = ""

    async function createShopandToggle() {
        await createNewShop(newShopName, $currentMarket.id, $currentUser.id)
        shopState.set('home')
    }

</script>

<button on:click={() => shopState.set('list')}>View shops</button>
<h2>Shop creation</h2>
<button on:click={createShopandToggle}>Create new Shop</button>
<input type="text" bind:value={newShopName}>