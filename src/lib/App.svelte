<script context="module">
    import { marketToggle } from './sessionStore'
</script>


<script>
    import Market from "./Market.svelte";
    import NewMarket from "./NewMarket.svelte";

    let shop = true
    function fss() {
        marketToggle.set(!$marketToggle)
    }
</script>



{#if $marketToggle}
        <button on:click={fss}>Go to market creation</button>
        <Market/>
        {#if shop}
            Shop component
        {/if}
{:else}
        <button on:click={fss}>Go to market overview</button>
        <NewMarket/>
{/if}