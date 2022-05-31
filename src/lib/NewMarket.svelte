<script>
    import { createNewMarket } from '$lib/db'
    import { marketToggle } from '$lib/sessionStore'

    let newMarketName = ""



    async function fss() {
        createNewMarket(newMarketName)
        marketToggle.set(!$marketToggle)
    }
</script>



<button on:click={fss}>Create new market</button>
<input type="text" bind:value={newMarketName}>