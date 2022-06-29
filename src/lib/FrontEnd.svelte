<script>
    import { getCurrentUser, getMarketsWithOwnerID, getMarketsWithPatronID, auth } from "./control/db";
    import { currentUser } from "$lib/control/sessionStore"
    
</script>

<script context="module">
    getCurrentUser()
</script>

<div class="container">
    <div class="logo">
        logo
    </div>
    <div class="sidebar">
        <div class="addMarketButton">
            Add a Market
        </div>
        <div class="addMarketButton">
            Join a Market
        </div>     

        <h3>Markets you own</h3>  
        {#await getMarketsWithOwnerID($currentUser.int_id) then value}
            {#each value as item}
                <button class="sidebarButton">{item.market_name}</button>
            {/each}
        {/await}

        <h3>Markets you patron</h3>
        {#await getMarketsWithPatronID($currentUser.int_id) then value}
            {#each value as item}
                <button class="sidebarButton">{item.market_name}</button>
            {/each}
        {/await}

    </div>
    <div class="main">
        <div class="marketContainer">
            <h3>Recent Markets</h3>
            <div class="marketplaces">
                <div class="market">MP1</div>
                <div class="market">MP2</div>
                <div class="market">MP3</div>
            </div>
        </div>
        <div class="messages">
            <h2>Messages</h2>
            <ul>
                <li>
                    <h3>From Xune</h3>
                    Imma kick your ass
                </li>
                <li>
                    <h3>From Iilah</h3>
                    Do you have enough soup
                </li>
            </ul>
        </div>
        <div class="loot">
            <h2>Your loot</h2>
            <ul>
                <li>Gauntlets</li>
                <li>Hat</li>
                <li>Buttons</li>
            </ul>
        </div>
    </div>
    <div class="title">
        <div class="user">
            <button on:click={() => auth.signOut()}>Sign out</button>
            Voldari
            <span class="dot"></span>
        </div>
    </div>
  </div>

<style>
    .user {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    li {
        margin: 20px;
    }

    .container {
        width: 100vw;
        height: 100vh;
        display: grid; 
        grid-template-columns: 1fr 3fr; 
        grid-template-rows: 1fr 9fr; 
        gap: 20px; 
        grid-template-areas: 
            "logo title"
            "sidebar main";
    }

    .logo { 
        grid-area: logo; 
        background-color: aliceblue;
    }

    .sidebar { 
        grid-area: sidebar;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center; 
        padding: 20px;
        background-color: lightcoral;
        border-radius: 50% 50% 0% 0% / 100px 100px 0% 0% ;
        padding-top: 100px;
    }

    .main {
        gap: 20px; 
        grid-area: main; 
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 0fr 1fr;
        padding: 20px;
        grid-template-areas: 
            "markets markets"
            "messages loot";
        background-color: aliceblue;
    }


    .marketplaces {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .marketContainer {
        grid-area: markets;
        background-color: bisque;
        padding: 20px;
    }

    .market {
        width: 150px;
        height: 150px;
        background-color: cornflowerblue;
    }

    .messages {
        grid-area: messages;
        background-color: bisque;
    }

    .loot {
        grid-area: loot;
        background-color: bisque;
    }
    
    .title { 
        grid-area: title; 
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 40px;
    }

    .addMarketButton {
        width: 200px;
        height: 50px;
        background-color: goldenrod;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .sidebarButton {
        width: 200px;
        height: 50px;
        background-color: indianred;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dot {
        height: 50px;
        width: 50px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
    }
</style>