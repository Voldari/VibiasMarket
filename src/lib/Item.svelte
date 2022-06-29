<script>
    /**
    * @type {{ item_name: any; item_cost: number; }}
    */
    export let item
</script>

<div class="container">
    <div class="info">
        <h3>{item.item_name}</h3>
        <div>quantity: 4</div>
        <div>costs: {item.item_cost}</div>
    </div>
    <button class="buy">buy</button>
</div>

<style>
    .container {
        border: solid;
        overflow: hidden;
        border-radius: 20px;
        margin: 20px;
        display: grid;
        grid-template-columns: 3fr 1fr; 
        grid-template-rows: 1fr; 
        gap: 0px 0px; 
        grid-template-areas: 
            "info buy"; 
    }

    .info { 
        grid-area: info;
        padding: 10px; 
    }
    .buy { 
        grid-area: buy; 
        border: none;
        background-color: seagreen;
    }
    .buy:hover {
        filter: brightness(85%);
    }
    .buy:active {
        filter: brightness(70%);
    }
</style>