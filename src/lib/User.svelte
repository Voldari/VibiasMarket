<script>
    import { user, auth } from '$lib/control/db'
</script>

<div class="container">
    {#if $user}
        <p>You are signed in as {$user.email}</p>
        <button on:click={() => auth.signOut()}>Sign out</button>
    {/if}
</div>

<style>
    .container {
        width: 500px;
        height: 100px;
        background-color: lightgray;
        grid-area: header;
    }
</style>