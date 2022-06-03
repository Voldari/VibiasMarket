<script>
    import { createNewMarket } from '$lib/db'
    import { newMarketToggle, currentUser, marketState, } from '$lib/sessionStore'

    let newMarketName = ""



    async function createMarketandToggle() {
        createNewMarket(newMarketName, $currentUser.id)
        newMarketToggle.set(!$newMarketToggle)
        marketState.set('home')
    }
</script>


<h2>Market creation</h2>
<button on:click={createMarketandToggle}>Create new market</button>
<input type="text" bind:value={newMarketName}>