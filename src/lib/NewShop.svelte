<script>
    import { createNewShop } from '$lib/db'
    import { newShopToggle, currentMarket, currentUser } from '$lib/sessionStore'

    let newShopName = ""



    async function createShopandToggle() {
        createNewShop(newShopName, $currentMarket.id, $currentUser.id)
        newShopToggle.set(!$newShopToggle)
    }
</script>

<button on:click={createShopandToggle}>Create new Shop</button>
<input type="text" bind:value={newShopName}>