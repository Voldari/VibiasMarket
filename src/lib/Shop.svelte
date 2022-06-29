<script>
import { getItemsWithShopID } from "./control/db";
import Item from "$lib/Item.svelte";

    /**
    * @type {{ shop_name: any; id: number; }}
    */
    export let shop
</script>

<div class="shop">
    <h3>{shop.shop_name}</h3>
    <h4>Smithing shop</h4>
    <hr>

    {#await getItemsWithShopID(shop.id) then value}
        {#each value as item}
            <Item {item}/>
        {/each}
    {/await}
</div>

<style>
    h3 {
        margin: 20px 0 0 20px;
        font-size: xx-large;
    }
    h4 {
        font-size: larger;
        margin-left: 30px;
    }
    hr {
        margin: 10px 20px 0 20px;
    }

    button {
        margin: 20px;
    }
    .shop {
        min-width: 300px;
        width: fit-content;
        min-height: 400px;
        border: solid;
        margin: 40px;
        background-color: white;
        box-shadow: 14px 14px 0 -3px gold, 14px 14px 0 0 black;
        border-radius: 10px;
    }
</style>