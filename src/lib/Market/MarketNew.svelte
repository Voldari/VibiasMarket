<script>
    import { createNewMarket } from '$lib/control/db'
    import { currentUser, marketState, } from '$lib/control/sessionStore'

    let newMarketName = ""

    async function createMarketandToggle() {
        await createNewMarket(newMarketName, $currentUser.int_id)
        marketState.set('home')
    }
</script>

<h2>Market creation</h2>

<button on:click={createMarketandToggle}>Create new market</button>
<input type="text" bind:value={newMarketName}>

<style>

</style>